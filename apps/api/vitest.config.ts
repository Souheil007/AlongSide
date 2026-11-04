import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@alongside/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
      '@alongside/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
    },
  },
});
