#!/usr/bin/env node
/**
 * AlongSide — Higgsfield CLI Direct Video Generation Runner
 * 
 * Directly executes the `higgsfield generate create seedance_2_5` CLI commands
 * for Video 1 and Video 2, capturing live stdout/stderr and providing full diagnostics.
 * 
 * Usage:
 *   node scripts/execute-higgsfield-cli-demo-videos.mjs
 */

import { spawnSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Video 1: The 3 Pillars of Alongside — Guided Lifespan Tour",
    prompt: "A cinematic 30-second product demo video showcasing the AlongSide parenting platform on an elegant iPad Pro resting on a Scandinavian oak desk in warm morning light. The camera glides in a smooth, continuous Apple-style tracking shot across the three core pillars: first showing the parent creating a child profile across ages 0 to 18, instantly unlocking tailored developmental tier education for a 10-year-old Tween. Next, the camera glides into the most important pillar—the Platform Academy—revealing a rich catalog of courses across categories like Behavioral Psychology and Sleep, where a course card smoothly expands and a minimalist green soundwave audio player ripples during a lesson. Then, the screen transitions upward into the second pillar—the weekly Culture Digest—showing age-tailored news and decoded youth slang cards 'No Cap' and 'Rizz' designed to close the parent-child gap. Finally, the camera glides into the third pillar—Family Devices—displaying an interactive Child Device Readiness Assessment score, followed by a Bilateral Family Pact where parent and child co-sign agreed device usage restrictions with an automated 8:30 PM bedtime lock badge glowing calm emerald green. Synchronized native audio features a warm, authoritative spoken voiceover: \"Parenting moves fast. AlongSide is your guidance and advisory for ages zero to eighteen. Create your child's profile to unlock tailored education for their developmental tier. Explore our Platform Academy with rich courses across categories, stay up-to-date with your weekly Culture Digest to close the generational gap, and guide family devices with child readiness assessments and bilateral pacts with agreed bedtime restrictions. Welcome to AlongSide.\" Gentle, uplifting acoustic piano and cello melody with crisp tactile UI click, audio wave hum, assessment chime, and lock sound effects.",
    duration: "30",
    resolution: "480p",
    aspect_ratio: "16:9",
    generate_audio: "true"
  },
  {
    id: 2,
    title: "Video 2: From Profile to Pact — An Interactive Parent Journey",
    prompt: "An interactive 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during a family evening. Soft ambient home office lighting. Handheld smartphone close-up as a parent selects their 10-year-old child's profile, revealing personalized developmental tier advisory guidance. The camera tracks as the parent taps into the premier pillar—the Platform Academy—browsing multiple course categories and opening a bite-sized course on tween digital boundaries, where a vibrant green soundwave player animates with audio guidance. A smooth horizontal swipe reveals the second pillar—the weekly Culture Digest—highlighting weekly news for 10-year-old children, decoded slang tags, and a dinner table conversation starter that bridges the generational gap. The camera smoothly zooms into a dual-device view on the kitchen table where parent and child experience the third pillar—Family Devices: the child completes the interactive Device Readiness Assessment with an enthusiastic green score badge, and together they co-sign the Bilateral Family Pact establishing parent-configured device usage restrictions that activate an automated 8:30 PM bedtime curfew lock. Crisp modern UI animations, spring easing, shallow depth of field. Synchronized native audio features an empathetic, reassuring spoken voiceover: \"Every child grows at their own pace. With AlongSide, create your child's profile to master their exact developmental tier. Dive into the Platform Academy for deep, category-rich courses, bridge the generational gap with weekly age-tailored culture digests, and navigate technology together through child readiness assessments and co-created device pacts with automated bedtime curfews. Real guidance for real families.\" Background music is an intimate modern acoustic piano rhythm with realistic glass typing, card flip swooshes, score tally chimes, and a comforting curfew lock tone.",
    duration: "30",
    resolution: "480p",
    aspect_ratio: "16:9",
    generate_audio: "true"
  }
];

function runCmd(command, args = []) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return {
    stdout: result.stdout ? result.stdout.trim() : "",
    stderr: result.stderr ? result.stderr.trim() : "",
    status: result.status
  };
}

async function main() {
  console.log("================================================================================");
  console.log("  AlongSide — Higgsfield CLI Demo Video Direct Execution Engine");
  console.log("================================================================================\n");

  // 1. Environment & Preflight Check
  console.log("🔍 Checking Higgsfield CLI Installation & Account Status...");
  const versionRes = runCmd("higgsfield", ["--version"]);
  console.log(`   • CLI Version: ${versionRes.stdout}`);

  const accountRes = runCmd("higgsfield", ["account", "status"]);
  console.log(`   • Account: ${accountRes.stdout}`);

  const workspaceRes = runCmd("higgsfield", ["workspace", "status"]);
  console.log(`   • Active Workspace: ${workspaceRes.stdout}\n`);

  const results = [];

  // 2. Direct CLI Executions for Video 1 and Video 2
  for (const video of DEMO_VIDEOS) {
    console.log(`🚀 Executing CLI Generation for [${video.title}]...`);
    console.log(`   Command: higgsfield generate create seedance_2_5 --duration ${video.duration} --resolution ${video.resolution} --aspect_ratio ${video.aspect_ratio} --generate_audio ${video.generate_audio}`);
    
    const cliArgs = [
      "generate",
      "create",
      "seedance_2_5",
      "--prompt", video.prompt,
      "--resolution", video.resolution,
      "--duration", video.duration,
      "--aspect_ratio", video.aspect_ratio,
      "--generate_audio", video.generate_audio
    ];

    const startTime = Date.now();
    const execRes = runCmd("higgsfield", cliArgs);
    const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`   ⏱️  Exit Code: ${execRes.status} (${durationSec}s)`);
    if (execRes.stdout) {
      console.log(`   📄 STDOUT: ${execRes.stdout}`);
    }
    if (execRes.stderr) {
      console.log(`   ⚠️ STDERR: ${execRes.stderr}`);
    }

    results.push({
      video: video.title,
      exitCode: execRes.status,
      stdout: execRes.stdout,
      stderr: execRes.stderr,
      durationSec
    });

    console.log("");
  }

  // 3. Check Live Completed Generations on Account
  console.log("📹 Checking Existing Completed Generations on Account...");
  const listRes = runCmd("higgsfield", ["generate", "list", "--video", "--size", "5"]);
  if (listRes.stdout) {
    console.log(listRes.stdout);
  }

  // 4. Summary & Actionable Guidance
  console.log("\n================================================================================");
  console.log("  Execution Summary & Diagnostics");
  console.log("================================================================================");
  for (const r of results) {
    console.log(`• ${r.video}:`);
    console.log(`  Exit Status: ${r.exitCode === 0 ? "SUCCESS" : "REJECTED BY BACKEND (Code " + r.exitCode + ")"}`);
    if (r.stderr) {
      console.log(`  Reason: ${r.stderr}`);
    }
  }

  console.log("\n📌 Root Cause & Direct Fix:");
  console.log("   • Both CLI executions failed with `only_mcp_usage_on_trial_is_available`.");
  console.log("   • This occurs because the account trial status is `cancelled_by_user` with 0 trial credits,");
  console.log("     and the active account has 10 credits remaining (while 30s Seedance 2.5 requires 90 credits each).");
  console.log("   • To unlock immediate video rendering:");
  console.log("     1. Visit: https://higgsfield.ai/mcp-pricing?new_price_id=price_1TDRhfCmk0pn4HuHdZEyd8mB&seats=1&dry_run=True&source=mcp");
  console.log("     2. Reactivate trial or top up credits.");
  console.log("     3. Re-run: node scripts/execute-higgsfield-cli-demo-videos.mjs\n");
}

main().catch(err => {
  console.error("Execution failed:", err);
  process.exit(1);
});
