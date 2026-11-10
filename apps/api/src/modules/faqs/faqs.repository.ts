import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  FAQ_SEED_CATEGORIES,
} from '@alongside/database';
import type {
  DevelopmentalTier,
  FaqCategoryDTO,
  FaqItemDTO,
  RoadType,
} from '@alongside/shared';
import { getEquivalentTiers } from '@alongside/shared';

export interface FaqFilterOptions {
  q?: string;
  category?: string;
  tier?: DevelopmentalTier;
  road?: RoadType;
  limit?: number;
  offset?: number;
}

export interface FaqRepository {
  findCategories(): Promise<FaqCategoryDTO[]>;
  findCategoryBySlug(slug: string): Promise<FaqCategoryDTO | null>;
  findFaqs(filter: FaqFilterOptions): Promise<{ faqs: FaqItemDTO[]; total: number }>;
  findFaqById(id: string): Promise<FaqItemDTO | null>;
  searchSimilarFaqs(
    query: string,
    options?: { tier?: DevelopmentalTier; road?: RoadType; limit?: number }
  ): Promise<FaqItemDTO[]>;
}

export class PrismaFaqRepository implements FaqRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findCategories(): Promise<FaqCategoryDTO[]> {
    const categories = await this.prisma.faqCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { faqs: true },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      sortOrder: cat.sortOrder,
      faqCount: cat._count.faqs,
    }));
  }

  async findCategoryBySlug(slug: string): Promise<FaqCategoryDTO | null> {
    const category = await this.prisma.faqCategory.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { faqs: true },
        },
      },
    });

    if (!category) return null;

    return {
      id: category.id,
      slug: category.slug,
      name: category.name,
      description: category.description,
      sortOrder: category.sortOrder,
      faqCount: category._count.faqs,
    };
  }

  async findFaqs(filter: FaqFilterOptions): Promise<{ faqs: FaqItemDTO[]; total: number }> {
    const { q, category, tier, road, limit = 20, offset = 0 } = filter;

    const where: any = {};

    if (category) {
      where.OR = [
        { categoryId: category },
        { category: { slug: category } },
      ];
    }

    if (tier) {
      const equivalents = getEquivalentTiers(tier);
      const tierClauses = [...equivalents.map((t) => ({ targetTier: t })), { targetTier: null }];
      where.OR = where.OR
        ? where.OR.flatMap((clause: any) =>
            equivalents.map((t) => ({ ...clause, targetTier: t })).concat({ ...clause, targetTier: null })
          )
        : tierClauses;
    }

    if (road) {
      where.targetRoad = { in: [road, null] };
    }

    if (q?.trim()) {
      const searchTerm = q.trim();
      const searchConditions = [
        { question: { contains: searchTerm, mode: 'insensitive' as const } },
        { answerMarkdown: { contains: searchTerm, mode: 'insensitive' as const } },
        { deEscalationScript: { contains: searchTerm, mode: 'insensitive' as const } },
      ];
      where.AND = [{ OR: searchConditions }];
    }

    const [total, faqs] = await Promise.all([
      this.prisma.faqItem.count({ where }),
      this.prisma.faqItem.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip: offset,
        take: limit,
        include: {
          category: {
            select: { slug: true, name: true },
          },
        },
      }),
    ]);

    return {
      total,
      faqs: faqs.map((f) => ({
        id: f.id,
        categoryId: f.categoryId,
        categorySlug: f.category.slug,
        categoryName: f.category.name,
        targetTier: f.targetTier as DevelopmentalTier | null,
        targetRoad: f.targetRoad as RoadType | null,
        question: f.question,
        answerMarkdown: f.answerMarkdown,
        deEscalationScript: f.deEscalationScript,
        isFeatured: f.isFeatured,
        createdAt: f.createdAt.toISOString(),
        updatedAt: f.updatedAt.toISOString(),
      })),
    };
  }

  async findFaqById(id: string): Promise<FaqItemDTO | null> {
    const faq = await this.prisma.faqItem.findUnique({
      where: { id },
      include: {
        category: {
          select: { slug: true, name: true },
        },
      },
    });

    if (!faq) return null;

    return {
      id: faq.id,
      categoryId: faq.categoryId,
      categorySlug: faq.category.slug,
      categoryName: faq.category.name,
      targetTier: faq.targetTier as DevelopmentalTier | null,
      targetRoad: faq.targetRoad as RoadType | null,
      question: faq.question,
      answerMarkdown: faq.answerMarkdown,
      deEscalationScript: faq.deEscalationScript,
      isFeatured: faq.isFeatured,
      createdAt: faq.createdAt.toISOString(),
      updatedAt: faq.updatedAt.toISOString(),
    };
  }

  async searchSimilarFaqs(
    query: string,
    options: { tier?: DevelopmentalTier; road?: RoadType; limit?: number } = {}
  ): Promise<FaqItemDTO[]> {
    const { tier, road, limit = 3 } = options;
    const tokens = query
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const where: any = {};
    if (tier) {
      const equivalents = getEquivalentTiers(tier);
      where.targetTier = { in: [...equivalents, null] };
    }
    if (road) where.targetRoad = { in: [road, null] };

    const candidates = await this.prisma.faqItem.findMany({
      where,
      take: 50,
      include: {
        category: {
          select: { slug: true, name: true },
        },
      },
    });

    // Score candidates by token overlap in question, script, and answer
    const scored = candidates.map((item) => {
      const qText = item.question.toLowerCase();
      const sText = (item.deEscalationScript || '').toLowerCase();
      const aText = item.answerMarkdown.toLowerCase();

      let score = 0;
      for (const t of tokens) {
        if (qText.includes(t)) score += 5;
        if (sText.includes(t)) score += 3;
        if (aText.includes(t)) score += 1;
      }
      return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map(({ item: f }) => ({
      id: f.id,
      categoryId: f.categoryId,
      categorySlug: f.category.slug,
      categoryName: f.category.name,
      targetTier: f.targetTier as DevelopmentalTier | null,
      targetRoad: f.targetRoad as RoadType | null,
      question: f.question,
      answerMarkdown: f.answerMarkdown,
      deEscalationScript: f.deEscalationScript,
      isFeatured: f.isFeatured,
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    }));
  }
}

export class InMemoryFaqRepository implements FaqRepository {
  private categories: (FaqCategoryDTO & { id: string })[] = [];
  private faqs: (FaqItemDTO & { id: string })[] = [];

  constructor(categoriesData = FAQ_SEED_CATEGORIES) {
    this.seedFromData(categoriesData);
  }

  private seedFromData(categoriesData: typeof FAQ_SEED_CATEGORIES) {
    this.categories = [];
    this.faqs = [];

    for (const cat of categoriesData) {
      const catId = `cat-${cat.slug}`;
      this.categories.push({
        id: catId,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
        faqCount: cat.faqs.length,
      });

      for (let i = 0; i < cat.faqs.length; i++) {
        const item = cat.faqs[i]!;
        this.faqs.push({
          id: `faq-${cat.slug}-${i + 1}`,
          categoryId: catId,
          categorySlug: cat.slug,
          categoryName: cat.name,
          targetTier: item.targetTier ?? null,
          targetRoad: item.targetRoad ?? null,
          question: item.question,
          answerMarkdown: item.answerMarkdown,
          deEscalationScript: item.deEscalationScript,
          isFeatured: item.isFeatured ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }
  }

  async findCategories(): Promise<FaqCategoryDTO[]> {
    return [...this.categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async findCategoryBySlug(slug: string): Promise<FaqCategoryDTO | null> {
    const cat = this.categories.find((c) => c.slug === slug);
    return cat ? { ...cat } : null;
  }

  async findFaqs(filter: FaqFilterOptions): Promise<{ faqs: FaqItemDTO[]; total: number }> {
    const { q, category, tier, road, limit = 20, offset = 0 } = filter;

    let results = [...this.faqs];

    if (category) {
      results = results.filter(
        (f) => f.categoryId === category || f.categorySlug === category
      );
    }

    if (tier) {
      const equivalents = new Set(getEquivalentTiers(tier));
      results = results.filter((f) => !f.targetTier || equivalents.has(f.targetTier));
    }

    if (road) {
      results = results.filter((f) => f.targetRoad === null || f.targetRoad === road);
    }

    if (q?.trim()) {
      const searchTerm = q.trim().toLowerCase();
      results = results.filter(
        (f) =>
          f.question.toLowerCase().includes(searchTerm) ||
          f.answerMarkdown.toLowerCase().includes(searchTerm) ||
          (f.deEscalationScript && f.deEscalationScript.toLowerCase().includes(searchTerm))
      );
    }

    const total = results.length;
    // Featured first, then order
    results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    const paginated = results.slice(offset, offset + limit);

    return {
      total,
      faqs: paginated,
    };
  }

  async findFaqById(id: string): Promise<FaqItemDTO | null> {
    const faq = this.faqs.find((f) => f.id === id);
    return faq ? { ...faq } : null;
  }

  async searchSimilarFaqs(
    query: string,
    options: { tier?: DevelopmentalTier; road?: RoadType; limit?: number } = {}
  ): Promise<FaqItemDTO[]> {
    const { tier, road, limit = 3 } = options;
    const tokens = query
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    let candidates = [...this.faqs];
    if (tier) {
      const equivalents = new Set(getEquivalentTiers(tier));
      candidates = candidates.filter((f) => !f.targetTier || equivalents.has(f.targetTier));
    }
    if (road) {
      candidates = candidates.filter((f) => f.targetRoad === null || f.targetRoad === road);
    }

    const scored = candidates.map((item) => {
      const qText = item.question.toLowerCase();
      const sText = (item.deEscalationScript || '').toLowerCase();
      const aText = item.answerMarkdown.toLowerCase();

      let score = 0;
      for (const t of tokens) {
        if (qText.includes(t)) score += 5;
        if (sText.includes(t)) score += 3;
        if (aText.includes(t)) score += 1;
      }
      return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.item);
  }
}
