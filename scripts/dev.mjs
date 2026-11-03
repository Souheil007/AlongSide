#!/usr/bin/env node
/**
 * Alongside — Concurrent Development Server Orchestrator
 * Spawns both the Fastify API (port 4000) and Next.js 15 Web Frontend (port 3000)
 * concurrently with clean signal forwarding and graceful shutdown.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';

// Ensure root .env variables are loaded into the process
try {
  process.loadEnvFile?.('.env');
} catch {
  // Ignore if already loaded or not present
}

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

console.log('\x1b[36m%s\x1b[0m', '================================================');
console.log('\x1b[36m%s\x1b[0m', '  Alongside — Development Server Orchestrator   ');
console.log('\x1b[36m%s\x1b[0m', '================================================');
console.log('  Web (Next.js 15):     \x1b[32mhttp://localhost:3000\x1b[0m');
console.log('  API (Fastify LTS 22): \x1b[32mhttp://localhost:4000\x1b[0m');
console.log('  Health check:         \x1b[34mhttp://localhost:4000/api/v1/health\x1b[0m');
console.log('------------------------------------------------\n');

// Spawn Fastify API server
const apiProcess = spawn(npxCmd, ['tsx', 'watch', 'src/index.ts'], {
  cwd: './apps/api',
  stdio: 'inherit',
  shell: isWindows,
  env: { ...process.env, FORCE_COLOR: '1' },
});

// Spawn Next.js Web frontend
const webProcess = spawn(npmCmd, ['run', 'dev', '--workspace=@alongside/web'], {
  stdio: 'inherit',
  shell: isWindows,
  env: { ...process.env, FORCE_COLOR: '1' },
});

let isShuttingDown = false;

function cleanup(exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('\n\x1b[33mGracefully shutting down Alongside dev servers...\x1b[0m');

  if (apiProcess && !apiProcess.killed) {
    try {
      if (isWindows) {
        spawn('taskkill', ['/pid', apiProcess.pid.toString(), '/T', '/F']);
      } else {
        apiProcess.kill('SIGINT');
      }
    } catch {}
  }

  if (webProcess && !webProcess.killed) {
    try {
      if (isWindows) {
        spawn('taskkill', ['/pid', webProcess.pid.toString(), '/T', '/F']);
      } else {
        webProcess.kill('SIGINT');
      }
    } catch {}
  }

  setTimeout(() => {
    process.exit(exitCode);
  }, 300);
}

process.on('SIGINT', () => cleanup(0));
process.on('SIGTERM', () => cleanup(0));

apiProcess.on('exit', (code) => {
  if (!isShuttingDown && code !== null && code !== 0 && code !== 130) {
    console.error(`\x1b[31mFastify API server exited with code ${code}\x1b[0m`);
    cleanup(code);
  }
});

webProcess.on('exit', (code) => {
  if (!isShuttingDown && code !== null && code !== 0 && code !== 130) {
    console.error(`\x1b[31mNext.js Web frontend exited with code ${code}\x1b[0m`);
    cleanup(code);
  }
});
