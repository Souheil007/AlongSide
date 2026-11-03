import type { PrismaClient } from '@prisma/client';
import { ExploitSeverity } from '@alongside/shared';

export interface SlangSeedData {
  term: string;
  definition: string;
  exampleSentence: string;
  contextTone: string;
}

export interface ExploitAlertSeedData {
  appName: string;
  exploitDescription: string;
  howKidsBypass: string;
  parentRemedy: string;
  severity: ExploitSeverity;
}

export interface CultureDigestSeedData {
  issueNumber: number;
  publishDate: Date;
  title: string;
  summary: string;
  conversationStarter: string;
  slangTerms: SlangSeedData[];
  exploitAlerts: ExploitAlertSeedData[];
}

export const SLANG_SEED_TERMS: SlangSeedData[] = [
  {
    term: 'Crashout',
    definition:
      'An explosive, irrational overreaction to a minor frustration or gaming defeat, completely abandoning restraint or strategic caution.',
    exampleSentence: 'He lost his 50-kill streak in Fortnite and completely crashed out on his live stream.',
    contextTone:
      'Playful exaggeration among gaming peers; flag if accompanied by actual property destruction or persistent real-world rage.',
  },
  {
    term: 'Rizz',
    definition:
      'Charisma or charm, specifically referring to the intuitive ability to impress, attract, or engage someone effortlessly in social conversation.',
    exampleSentence: 'He has unspoken rizz whenever he tells that story about camp.',
    contextTone: 'Benign social banter and playful confidence boosting; completely harmless.',
  },
  {
    term: 'Skibidi',
    definition:
      'A catch-all absurdist slang term originating from the viral YouTube animation series, used flexibly as an adjective for cool, weird, or meaningless rhythmic emphasis.',
    exampleSentence: 'That Minecraft parody video is peak skibidi humor.',
    contextTone: 'Absurdist tween nonsense wordplay; completely harmless.',
  },
  {
    term: 'Looksmaxing',
    definition:
      'The practice of attempting to optimize facial structure, jawline definition, skincare, and grooming habits through regimens and exercises.',
    exampleSentence: 'A lot of guys in eighth grade are obsessing over looksmaxing and jawline chew tools.',
    contextTone:
      'Generally harmless personal grooming interest; monitor for underlying body dysmorphia or restrictive eating behaviors.',
  },
  {
    term: 'Cooked',
    definition:
      'Doomed, exhausted, caught, or ruined with no plausible escape from an impending difficult situation or failure.',
    exampleSentence: 'If I do not finish this history project before school tomorrow morning, I am completely cooked.',
    contextTone: 'Humorous dramatic exaggeration of academic or interpersonal stress.',
  },
  {
    term: 'Gyatt',
    definition:
      'An exclamation of surprise, excitement, or emphasis, frequently directed at an individual with prominent physical curves.',
    exampleSentence: 'Did you see that outfit they walked in with? Gyatt!',
    contextTone:
      'Mild suggestive streamer slang popularized on Twitch and YouTube; check context in middle school group chats.',
  },
];

export const EXPLOIT_SEED_ALERTS: ExploitAlertSeedData[] = [
  {
    appName: 'Calculator+ (Secret Calculator Vault)',
    exploitDescription:
      'A fully functional, disguised calculator app that unlocks a hidden, password-encrypted vault for photos, videos, and private web browsing when a secret numeric PIN is entered.',
    howKidsBypass:
      'Kids download the app to hide restricted media or conversations from parental screen checks. The app icon and interface appear as a standard working calculator.',
    parentRemedy:
      'Open Settings > iPhone Storage (or Android App Storage) and look for calculator apps with unusually large storage sizes (e.g. >500 MB) or duplicate calculator applications.',
    severity: ExploitSeverity.HIGH,
  },
  {
    appName: 'Google Translate Web Proxy',
    exploitDescription:
      'Using Google Translate website translation feature as an unblocked reverse web proxy to browse blacklisted URLs within restricted school or home WiFi networks.',
    howKidsBypass:
      'Kids paste the blocked URL into the left translation box, select English to Spanish, and click the generated link in the right translation box. Google loads and renders the website inside its own trusted domain.',
    parentRemedy:
      'Ensure device-level content restrictions (such as Alongside signed Apple profiles or Screen Time web filters) are enforced on the device itself, rather than relying solely on local router keyword blockers.',
    severity: ExploitSeverity.MEDIUM,
  },
  {
    appName: 'Sendit / NGL Anonymous Q&A',
    exploitDescription:
      'Third-party companion apps integrated with Snapchat or Instagram story stickers that allow followers to submit anonymous questions, feedback, or comments.',
    howKidsBypass:
      'Teens post the sticker on their public or private story, inviting peers to submit anonymous messages. Because the sender is hidden, it often becomes an unregulated vector for cyberbullying, gossip, and harassment.',
    parentRemedy:
      'Establish a bilateral agreement clause prohibiting anonymous feedback plugins, explaining that real empathy and community require accountability rather than anonymous comment boxes.',
    severity: ExploitSeverity.HIGH,
  },
];

export const DIGEST_SEED_ISSUE: CultureDigestSeedData = {
  issueNumber: 42,
  publishDate: new Date('2026-11-01T00:00:00.000Z'),
  title: "Decoding 'Crashout' & The Calculator Vault Bypass",
  summary:
    "This week's Sunday briefing decodes trending tween gaming slang ('crashout', 'skibidi', 'rizz'), alerts parents to disguised calculator photo vaults, and provides dinner conversation prompts that invite genuine storytelling.",
  conversationStarter:
    'Ask your tween what the funniest meme they saw this week was and why it made them laugh.',
  slangTerms: SLANG_SEED_TERMS,
  exploitAlerts: EXPLOIT_SEED_ALERTS,
};

export async function seedDigest(prisma: PrismaClient): Promise<void> {
  console.log('[Seed] Seeding Weekly Youth Culture Digest, Slang Dictionary, and Exploit Alerts...');

  const digestRecord = await prisma.cultureDigest.upsert({
    where: { issueNumber: DIGEST_SEED_ISSUE.issueNumber },
    update: {
      title: DIGEST_SEED_ISSUE.title,
      summary: DIGEST_SEED_ISSUE.summary,
      conversationStarter: DIGEST_SEED_ISSUE.conversationStarter,
      publishDate: DIGEST_SEED_ISSUE.publishDate,
    },
    create: {
      issueNumber: DIGEST_SEED_ISSUE.issueNumber,
      title: DIGEST_SEED_ISSUE.title,
      summary: DIGEST_SEED_ISSUE.summary,
      conversationStarter: DIGEST_SEED_ISSUE.conversationStarter,
      publishDate: DIGEST_SEED_ISSUE.publishDate,
    },
  });

  for (const slang of SLANG_SEED_TERMS) {
    await prisma.slangTerm.upsert({
      where: { term: slang.term },
      update: {
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
        digestId: digestRecord.id,
      },
      create: {
        term: slang.term,
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
        digestId: digestRecord.id,
      },
    });
  }

  // Exploit Alerts (Upsert matching by appName)
  for (const exploit of EXPLOIT_SEED_ALERTS) {
    const existing = await prisma.exploitAlert.findFirst({
      where: { appName: exploit.appName },
    });

    if (existing) {
      await prisma.exploitAlert.update({
        where: { id: existing.id },
        data: {
          exploitDescription: exploit.exploitDescription,
          howKidsBypass: exploit.howKidsBypass,
          parentRemedy: exploit.parentRemedy,
          severity: exploit.severity,
          digestId: digestRecord.id,
        },
      });
    } else {
      await prisma.exploitAlert.create({
        data: {
          appName: exploit.appName,
          exploitDescription: exploit.exploitDescription,
          howKidsBypass: exploit.howKidsBypass,
          parentRemedy: exploit.parentRemedy,
          severity: exploit.severity,
          digestId: digestRecord.id,
        },
      });
    }
  }

  console.log(
    `[Seed] Successfully seeded Digest Issue #${DIGEST_SEED_ISSUE.issueNumber} with ${SLANG_SEED_TERMS.length} slang terms and ${EXPLOIT_SEED_ALERTS.length} exploit alerts.`
  );
}
