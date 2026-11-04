import { prisma } from '../../src/client.js';
import { seedAcademy } from './academy.seed.js';
import { seedDigest } from './digest.seed.js';
import { seedFaqs } from './faqs.seed.js';
import { seedMilestones } from './milestones.seed.js';
import { seedHealthProtocols } from './health.seed.js';
import { seedNutritionGuides } from './nutrition.seed.js';
import { seedBrainGames } from './brainGames.seed.js';
import { seedBehaviorGuides } from './behavior.seed.js';

export async function runDatabaseSeed(): Promise<void> {
  console.log('--- Starting Alongside Database Master Seed ---');
  try {
    await seedAcademy(prisma);
    await seedDigest(prisma);
    await seedFaqs(prisma);
    await seedMilestones(prisma);
    await seedHealthProtocols(prisma);
    await seedNutritionGuides(prisma);
    await seedBrainGames(prisma);
    await seedBehaviorGuides(prisma);
    console.log('--- Alongside Database Master Seed Completed Successfully ---');
  } catch (error) {
    console.error('Database seeding failed with error:', error);
    process.exitCode = 1;
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Auto-run if executed directly via node or tsx
if (
  process.argv[1]?.endsWith('seed/index.ts') ||
  process.argv[1]?.endsWith('seed/index.js') ||
  process.argv[1]?.includes('seed')
) {
  runDatabaseSeed().catch(() => {
    process.exit(1);
  });
}
