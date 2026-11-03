import { prisma } from '../../src/client.js';
import { seedAcademy } from './academy.seed.js';
import { seedDigest } from './digest.seed.js';

export async function runDatabaseSeed(): Promise<void> {
  console.log('--- Starting Alongside Database Master Seed ---');
  try {
    await seedAcademy(prisma);
    await seedDigest(prisma);
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
