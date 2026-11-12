#!/usr/bin/env node
/**
 * AlongSide — Higgsfield AI Demo Video Generator (MCP Runner)
 * 
 * Executes the generation of the two official 30-second product demo videos
 * using the official Higgsfield MCP server endpoint (https://mcp.higgsfield.ai/mcp)
 * and the Seedance 2.5 model (480p, 16:9, Native Audio).
 * 
 * Usage:
 *   node scripts/generate-higgsfield-demo-videos.mjs [--preflight] [--unlim] [--video 1|2|all]
 */

import https from "node:https";
import { execSync } from "node:child_process";

const MCP_ENDPOINT = "https://mcp.higgsfield.ai/mcp";

// 1. Resolve Auth Token
function getAuthToken() {
  if (process.env.HIGGSFIELD_API_TOKEN) {
    return process.env.HIGGSFIELD_API_TOKEN.trim();
  }
  try {
    const token = execSync("higgsfield auth token", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return token.trim();
  } catch {
    console.error("❌ Error: Higgsfield auth token not found.");
    console.error("Please run `higgsfield auth login` or set the HIGGSFIELD_API_TOKEN environment variable.");
    process.exit(1);
  }
}

// 2. Low-Level JSON-RPC MCP Tool Invoker
function callMcpTool(token, toolName, args) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args
      }
    });

    const req = https.request(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream"
      }
    }, (res) => {
      let raw = "";
      res.on("data", chunk => raw += chunk);
      res.on("end", () => {
        try {
          const match = raw.match(/data:\s*({.*})/);
          if (match) {
            const parsed = JSON.parse(match[1]);
            resolve({ statusCode: res.statusCode, result: parsed.result, isError: parsed.result?.isError });
          } else {
            resolve({ statusCode: res.statusCode, raw });
          }
        } catch (err) {
          reject(new Error(`Failed to parse MCP response: ${err.message}`));
        }
      });
    });

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

// 3. Demo Video Prompts & Specifications
const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Video 1: The 3 Pillars of Alongside — Guided Lifespan Tour",
    prompt: "A cinematic 30-second product demo video showcasing the AlongSide parenting platform on an elegant iPad Pro resting on a Scandinavian oak desk in warm morning light. The camera glides in a smooth, continuous Apple-style tracking shot across the three core pillars: first showing the parent creating a child profile across ages 0 to 18, instantly unlocking tailored developmental tier education for a 10-year-old Tween. Next, the camera glides into the most important pillar—the Platform Academy—revealing a rich catalog of courses across categories like Behavioral Psychology and Sleep, where a course card smoothly expands and a minimalist green soundwave audio player ripples during a lesson. Then, the screen transitions upward into the second pillar—the weekly Culture Digest—showing age-tailored news and decoded youth slang cards 'No Cap' and 'Rizz' designed to close the parent-child gap. Finally, the camera glides into the third pillar—Family Devices—displaying an interactive Child Device Readiness Assessment score, followed by a Bilateral Family Pact where parent and child co-sign agreed device usage restrictions with an automated 8:30 PM bedtime lock badge glowing calm emerald green. Synchronized native audio features a warm, authoritative spoken voiceover: \"Parenting moves fast. AlongSide is your guidance and advisory for ages zero to eighteen. Create your child's profile to unlock tailored education for their developmental tier. Explore our Platform Academy with rich courses across categories, stay up-to-date with your weekly Culture Digest to close the generational gap, and guide family devices with child readiness assessments and bilateral pacts with agreed bedtime restrictions. Welcome to AlongSide.\" Gentle, uplifting acoustic piano and cello melody with crisp tactile UI click, audio wave hum, assessment chime, and lock sound effects.",
    duration: 30,
    resolution: "480p",
    aspect_ratio: "16:9",
    generate_audio: true
  },
  {
    id: 2,
    title: "Video 2: From Profile to Pact — An Interactive Parent Journey",
    prompt: "An interactive 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during a family evening. Soft ambient home office lighting. Handheld smartphone close-up as a parent selects their 10-year-old child's profile, revealing personalized developmental tier advisory guidance. The camera tracks as the parent taps into the premier pillar—the Platform Academy—browsing multiple course categories and opening a bite-sized course on tween digital boundaries, where a vibrant green soundwave player animates with audio guidance. A smooth horizontal swipe reveals the second pillar—the weekly Culture Digest—highlighting weekly news for 10-year-old children, decoded slang tags, and a dinner table conversation starter that bridges the generational gap. The camera smoothly zooms into a dual-device view on the kitchen table where parent and child experience the third pillar—Family Devices: the child completes the interactive Device Readiness Assessment with an enthusiastic green score badge, and together they co-sign the Bilateral Family Pact establishing parent-configured device usage restrictions that activate an automated 8:30 PM bedtime curfew lock. Crisp modern UI animations, spring easing, shallow depth of field. Synchronized native audio features an empathetic, reassuring spoken voiceover: \"Every child grows at their own pace. With AlongSide, create your child's profile to master their exact developmental tier. Dive into the Platform Academy for deep, category-rich courses, bridge the generational gap with weekly age-tailored culture digests, and navigate technology together through child readiness assessments and co-created device pacts with automated bedtime curfews. Real guidance for real families.\" Background music is an intimate modern acoustic piano rhythm with realistic glass typing, card flip swooshes, score tally chimes, and a comforting curfew lock tone.",
    duration: 30,
    resolution: "480p",
    aspect_ratio: "16:9",
    generate_audio: true
  }
];

// 4. Main Execution Routine
async function main() {
  console.log("================================================================================");
  console.log("  AlongSide — Higgsfield AI Demo Video Generator (MCP Runner)");
  console.log("================================================================================\n");

  const token = getAuthToken();
  console.log(`🔐 Authenticated with Higgsfield Bearer Token (${token.slice(0, 10)}...)\n`);

  // Step A: Check Balance & Workspaces
  console.log("🔍 Checking Higgsfield Account Status & Workspaces...");
  const balanceRes = await callMcpTool(token, "balance", {});
  const credits = balanceRes.result?.structuredContent?.credits ?? "Unknown";
  const plan = balanceRes.result?.structuredContent?.subscription_plan_type ?? "Unknown";
  console.log(`   • Plan: ${plan}`);
  console.log(`   • Current Balance: ${credits} credits`);

  // Check Unlimited Generations Allowance on Account
  const exploreRes = await callMcpTool(token, "models_explore", { action: "list", unlim: true });
  const unlimStatus = exploreRes.result?.structuredContent?.unlim;
  const isUnlimAvailable = Boolean(unlimStatus?.available);
  console.log(`   • Unlimited Generations Active: ${isUnlimAvailable ? "YES (Unlimited Free Trial)" : "NO (Not active / Trial cancelled)"}`);
  if (unlimStatus?.expires_at) {
    console.log(`   • Allowance Expires: ${unlimStatus.expires_at}`);
  }
  console.log("");

  const wsRes = await callMcpTool(token, "list_workspaces", {});
  const workspaces = wsRes.result?.structuredContent?.workspaces || [];
  if (workspaces.length > 0) {
    const targetWs = workspaces[0];
    console.log(`🏢 Selecting Workspace: ${targetWs.id} (${targetWs.type})...`);
    await callMcpTool(token, "select_workspace", { workspace_id: targetWs.id });
    console.log("   ✓ Workspace active.\n");
  }

  const isPreflightOnly = process.argv.includes("--preflight");
  const forceUnlim = process.argv.includes("--unlim");
  const useUnlim = forceUnlim || isUnlimAvailable;

  // Step B: Preflight Cost Verification
  console.log("📊 Preflight Cost Calculation for Seedance 2.5 (30s, 480p, Native Audio):");
  for (const video of DEMO_VIDEOS) {
    const costRes = await callMcpTool(token, "generate_video", {
      params: {
        model: "seedance_2_5",
        prompt: video.prompt,
        duration: video.duration,
        resolution: video.resolution,
        aspect_ratio: video.aspect_ratio,
        get_cost: true
      }
    });
    const quotedCost = costRes.result?.structuredContent?.cost?.credits ?? 90;
    console.log(`   • [${video.title}]: ${quotedCost} credits required.`);
  }
  console.log(`   • Generation Mode: ${useUnlim ? "Unlimited Trial (use_unlim: true)" : "Standard Credits"}\n`);

  if (isPreflightOnly) {
    console.log("ℹ️  --preflight flag detected. Halting prior to generation submission.");
    return;
  }

  // Step C: Execute Video Generations
  for (const video of DEMO_VIDEOS) {
    console.log(`🚀 Submitting ${video.title} via Higgsfield MCP...`);
    const params = {
      model: "seedance_2_5",
      prompt: video.prompt,
      duration: video.duration,
      resolution: video.resolution,
      aspect_ratio: video.aspect_ratio,
      generate_audio: video.generate_audio
    };
    if (useUnlim) {
      params.use_unlim = true;
    }

    const submitRes = await callMcpTool(token, "generate_video", { params });

    if (submitRes.isError) {
      const errMsg = submitRes.result?.content?.[0]?.text || JSON.stringify(submitRes.result);
      console.warn(`   ⚠️ Generation rejected by backend:`);
      console.warn(`      ${errMsg}\n`);

      if (errMsg.includes("Unlimited generations aren't available")) {
        console.log("   📌 Unlimited Status Note:");
        console.log("      The MCP backend rejected `use_unlim: true` because unlimited trial is not currently active on this account.");
        console.log("      Trial Status: `cancelled_by_user` (0 trial credits).");
        console.log("      Reactivate trial or top up at: https://higgsfield.ai/mcp-pricing\n");
      } else if (errMsg.includes("only_mcp_usage_on_trial_is_available") || errMsg.includes("credits")) {
        console.log("   📌 Resolution Note:");
        console.log(`      Your account currently has ${credits} credits, while Seedance 2.5 (30s) requires 90 credits.`);
        console.log("      The trial period was previously marked 'cancelled_by_user'.");
        console.log("      To generate these high-fidelity 30s clips, visit:");
        console.log("      https://higgsfield.ai/mcp-pricing to top up credits or reactivate your trial.\n");
      }
    } else {
      console.log("   ✓ Job submitted successfully!");
      console.log("   Response:", JSON.stringify(submitRes.result, null, 2));
    }
  }

  console.log("================================================================================");
  console.log("  Higgsfield Demo Video Generation Pipeline Complete");
  console.log("================================================================================");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
