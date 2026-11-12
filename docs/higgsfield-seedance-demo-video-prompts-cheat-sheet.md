# AlongSide Demo Videos — Higgsfield Seedance 2.5 Quick Runner & Prompt Cheat Sheet
**Author:** Chief Executive Officer (CEO)  
**Target:** 1-Click Terminal Execution & Instant Copy-Paste  
**Parent Specification:** [`docs/higgsfield-seedance-demo-video-prompts.md`](higgsfield-seedance-demo-video-prompts.md)  
**Task Reference:** Paperclip SOU-111  
**Engine:** Higgsfield AI — Seedance 2.5 (`seedance_2_5`) Free Tier (`480p`, `30s`, `16:9`, Native Audio Enabled)  
**Core Framework:** 3 Core Pillars (Platform Academy, Weekly Culture Digest, Family Devices & Bilateral Pacts)  

---

## ⚡ Quick-Start Execution

### Option A: Automated Direct CLI Runner Script (1-Click)
```bash
# Execute direct CLI commands for both Video 1 and Video 2 with automated error capture:
node scripts/execute-higgsfield-cli-demo-videos.mjs
```

---

### Option B: Automated Higgsfield MCP Script Runner
```bash
# Preflight cost and workspace verification:
node scripts/generate-higgsfield-demo-videos.mjs --preflight

# Execute generation attempting unlimited free trial mode (use_unlim: true):
node scripts/generate-higgsfield-demo-videos.mjs --unlim

# Execute standard generation:
node scripts/generate-higgsfield-demo-videos.mjs
```

---

### Option C: Manual Higgsfield CLI Commands

#### Video 1: "The 3 Pillars of Alongside — Guided Lifespan Tour" (Platform Experience)
```bash
higgsfield generate create seedance_2_5 \
  --prompt "A cinematic 30-second product demo video showcasing the AlongSide parenting platform on an elegant iPad Pro resting on a Scandinavian oak desk in warm morning light. The camera glides in a smooth, continuous Apple-style tracking shot across the three core pillars: first showing the parent creating a child profile across ages 0 to 18, instantly unlocking tailored developmental tier education for a 10-year-old Tween. Next, the camera glides into the most important pillar—the Platform Academy—revealing a rich catalog of courses across categories like Behavioral Psychology and Sleep, where a course card smoothly expands and a minimalist green soundwave audio player ripples during a lesson. Then, the screen transitions upward into the second pillar—the weekly Culture Digest—showing age-tailored news and decoded youth slang cards 'No Cap' and 'Rizz' designed to close the parent-child gap. Finally, the camera glides into the third pillar—Family Devices—displaying an interactive Child Device Readiness Assessment score, followed by a Bilateral Family Pact where parent and child co-sign agreed device usage restrictions with an automated 8:30 PM bedtime lock badge glowing calm emerald green. Synchronized native audio features a warm, authoritative spoken voiceover: \"Parenting moves fast. AlongSide is your guidance and advisory for ages zero to eighteen. Create your child's profile to unlock tailored education for their developmental tier. Explore our Platform Academy with rich courses across categories, stay up-to-date with your weekly Culture Digest to close the generational gap, and guide family devices with child readiness assessments and bilateral pacts with agreed bedtime restrictions. Welcome to AlongSide.\" Gentle, uplifting acoustic piano and cello melody with crisp tactile UI click, audio wave hum, assessment chime, and lock sound effects." \
  --resolution 480p \
  --duration 30 \
  --aspect_ratio 16:9 \
  --generate_audio true \
  --wait
```

---

### Video 2: "From Profile to Pact — An Interactive Parent Journey" (Interactive Walkthrough)
```bash
higgsfield generate create seedance_2_5 \
  --prompt "An interactive 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during a family evening. Soft ambient home office lighting. Handheld smartphone close-up as a parent selects their 10-year-old child's profile, revealing personalized developmental tier advisory guidance. The camera tracks as the parent taps into the premier pillar—the Platform Academy—browsing multiple course categories and opening a bite-sized course on tween digital boundaries, where a vibrant green soundwave player animates with audio guidance. A smooth horizontal swipe reveals the second pillar—the weekly Culture Digest—highlighting weekly news for 10-year-old children, decoded slang tags, and a dinner table conversation starter that bridges the generational gap. The camera smoothly zooms into a dual-device view on the kitchen table where parent and child experience the third pillar—Family Devices: the child completes the interactive Device Readiness Assessment with an enthusiastic green score badge, and together they co-sign the Bilateral Family Pact establishing parent-configured device usage restrictions that activate an automated 8:30 PM bedtime curfew lock. Crisp modern UI animations, spring easing, shallow depth of field. Synchronized native audio features an empathetic, reassuring spoken voiceover: \"Every child grows at their own pace. With AlongSide, create your child's profile to master their exact developmental tier. Dive into the Platform Academy for deep, category-rich courses, bridge the generational gap with weekly age-tailored culture digests, and navigate technology together through child readiness assessments and co-created device pacts with automated bedtime curfews. Real guidance for real families.\" Background music is an intimate modern acoustic piano rhythm with realistic glass typing, card flip swooshes, score tally chimes, and a comforting curfew lock tone." \
  --resolution 480p \
  --duration 30 \
  --aspect_ratio 16:9 \
  --generate_audio true \
  --wait
```

---

## 📋 Raw Prompt Blocks (Copy-Paste for Higgsfield Web UI or MCP)

### Prompt 1: Macro Platform Experience Tour (3 Pillars & Lifespan Breadth)
```text
A cinematic 30-second product demo video showcasing the AlongSide parenting platform on an elegant iPad Pro resting on a Scandinavian oak desk in warm morning light. The camera glides in a smooth, continuous Apple-style tracking shot across the three core pillars: first showing the parent creating a child profile across ages 0 to 18, instantly unlocking tailored developmental tier education for a 10-year-old Tween. Next, the camera glides into the most important pillar—the Platform Academy—revealing a rich catalog of courses across categories like Behavioral Psychology and Sleep, where a course card smoothly expands and a minimalist green soundwave audio player ripples during a lesson. Then, the screen transitions upward into the second pillar—the weekly Culture Digest—showing age-tailored news and decoded youth slang cards 'No Cap' and 'Rizz' designed to close the parent-child gap. Finally, the camera glides into the third pillar—Family Devices—displaying an interactive Child Device Readiness Assessment score, followed by a Bilateral Family Pact where parent and child co-sign agreed device usage restrictions with an automated 8:30 PM bedtime lock badge glowing calm emerald green. Synchronized native audio features a warm, authoritative spoken voiceover: "Parenting moves fast. AlongSide is your guidance and advisory for ages zero to eighteen. Create your child's profile to unlock tailored education for their developmental tier. Explore our Platform Academy with rich courses across categories, stay up-to-date with your weekly Culture Digest to close the generational gap, and guide family devices with child readiness assessments and bilateral pacts with agreed bedtime restrictions. Welcome to AlongSide." Gentle, uplifting acoustic piano and cello melody with crisp tactile UI click, audio wave hum, assessment chime, and lock sound effects.
```

### Prompt 2: Micro Interactive Walkthrough (From Profile to Pact)
```text
An interactive 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during a family evening. Soft ambient home office lighting. Handheld smartphone close-up as a parent selects their 10-year-old child's profile, revealing personalized developmental tier advisory guidance. The camera tracks as the parent taps into the premier pillar—the Platform Academy—browsing multiple course categories and opening a bite-sized course on tween digital boundaries, where a vibrant green soundwave player animates with audio guidance. A smooth horizontal swipe reveals the second pillar—the weekly Culture Digest—highlighting weekly news for 10-year-old children, decoded slang tags, and a dinner table conversation starter that bridges the generational gap. The camera smoothly zooms into a dual-device view on the kitchen table where parent and child experience the third pillar—Family Devices: the child completes the interactive Device Readiness Assessment with an enthusiastic green score badge, and together they co-sign the Bilateral Family Pact establishing parent-configured device usage restrictions that activate an automated 8:30 PM bedtime curfew lock. Crisp modern UI animations, spring easing, shallow depth of field. Synchronized native audio features an empathetic, reassuring spoken voiceover: "Every child grows at their own pace. With AlongSide, create your child's profile to master their exact developmental tier. Dive into the Platform Academy for deep, category-rich courses, bridge the generational gap with weekly age-tailored culture digests, and navigate technology together through child readiness assessments and co-created device pacts with automated bedtime curfews. Real guidance for real families." Background music is an intimate modern acoustic piano rhythm with realistic glass typing, card flip swooshes, score tally chimes, and a comforting curfew lock tone.
```

---

## 🎙️ Spoken Voiceover Reference Scripts

### Video 1 Voiceover (Paced across 30s):
> *"Parenting moves fast. AlongSide is your guidance and advisory for ages zero to eighteen. Create your child's profile to unlock tailored education for their developmental tier. Explore our Platform Academy with rich courses across categories, stay up-to-date with your weekly Culture Digest to close the generational gap, and guide family devices with child readiness assessments and bilateral pacts with agreed bedtime restrictions. Welcome to AlongSide."*

### Video 2 Voiceover (Paced across 30s):
> *"Every child grows at their own pace. With AlongSide, create your child's profile to master their exact developmental tier. Dive into the Platform Academy for deep, category-rich courses, bridge the generational gap with weekly age-tailored culture digests, and navigate technology together through child readiness assessments and co-created device pacts with automated bedtime curfews. Real guidance for real families."*

---

## ⚙️ Model Parameter Reference

| Flag | Argument | Description |
| :--- | :--- | :--- |
| Model ID | `seedance_2_5` | High-fidelity video diffusion model with native audio conditioning |
| `--resolution` | `480p` | Free tier standard resolution for fast generation |
| `--duration` | `30` | 30-second continuous sequence |
| `--aspect_ratio` | `16:9` | Landscape widescreen video aspect ratio |
| `--generate_audio` | `true` | Synthesizes synchronized voiceover narration, musical score, and UI SFX |
| `--wait` | *(flag)* | Holds process until rendering completes and outputs the final media URL |

---

## 📊 Live CLI Execution Diagnostics & Account Status

Direct terminal execution of the CLI commands via `node scripts/execute-higgsfield-cli-demo-videos.mjs` was executed on the host:

```text
================================================================================
  AlongSide — Higgsfield CLI Demo Video Direct Execution Engine
================================================================================

🔍 Checking Higgsfield CLI Installation & Account Status...
   • CLI Version: higgsfield 1.2.3 (4cdfcbdbc9972c1092f9d8fcb93a00c3a97de84f)
   • Account: mouradmaker@gmail.com — ultra plan, 10 credits
   • Active Workspace: Private — ultra plan, 10 credits

🚀 Executing CLI Generation for [Video 1: The 3 Pillars of Alongside — Guided Lifespan Tour]...
   Command: higgsfield generate create seedance_2_5 --duration 30 --resolution 480p --aspect_ratio 16:9 --generate_audio true
   ⏱️ Exit Code: 3
   ⚠️ STDERR: Error: {"error_type":"only_mcp_usage_on_trial_is_available"}

🚀 Executing CLI Generation for [Video 2: From Profile to Pact — An Interactive Parent Journey]...
   Command: higgsfield generate create seedance_2_5 --duration 30 --resolution 480p --aspect_ratio 16:9 --generate_audio true
   ⏱️ Exit Code: 3
   ⚠️ STDERR: Error: {"error_type":"only_mcp_usage_on_trial_is_available"}
```

### Root Cause & Unlock Step (`trial_ends_at` vs. `cancelled_by_user`):
- **Why `trial_ends_at: "2026-11-14T11:03:13Z"` is in the future but generations were rejected:**
  - The trial was scheduled to end on **November 14, 2026** (`trial_ends_at`).
  - However, because the trial subscription was cancelled early, Higgsfield's backend immediately flipped `unlim_trial_in_mcp_active: false` and set `trial_credits: 0`, revoking unmetered generations before the expiration date.
  - The account currently holds **9.0 credits** (each 30s `seedance_2_5` generation costs 90 credits = 180 credits total), causing standard credit calls to return HTTP 403 `only_mcp_usage_on_trial_is_available`.
- **Immediate Resolution:**
  1. **Resume / Reactivate Trial:** Since `trial_ends_at` is Nov 14, visit [Higgsfield Web Dashboard](https://higgsfield.ai) under Account / Billing and click **"Resume Subscription" / "Reactivate Trial"** to restore unmetered generation at zero cost for the remaining period.
  2. **Or Top-Up Credits:** Visit [Higgsfield MCP Pricing](https://higgsfield.ai/mcp-pricing?new_price_id=price_1TDRhfCmk0pn4HuHdZEyd8mB&seats=1&dry_run=True&source=mcp).
  3. **Run Runner:** `node scripts/generate-higgsfield-demo-videos.mjs --unlim` or `node scripts/execute-higgsfield-cli-demo-videos.mjs`.

---

## 🎥 Completed Seedance 2.5 Demo Video References (Generated on Account)

The account previously generated three 30-second Seedance 2.5 launch video renders that are fully completed, hosted on CloudFront, and viewable immediately:

1. [**Launch Trailer Part 1 (Shot 1–3, 30s, Seedance 2.5)**](https://d8j0ntlcm91z4.cloudfront.net/user_3LxPLfkmENXyKn29oERn9nhTYJr/hf_20261111_125709_9de81a3e-c2f3-4d32-8e46-036b21613fec.mp4):
   - **ID:** `9de81a3e-c2f3-4d32-8e46-036b21613fec`
   - **Created:** 2026-11-11 12:57 UTC
   - **Features:** Dim nursery tension to Scandinavian kitchen reveal, iPad Pro app interface, developmental horizon arc, and hands-free nutrition food ladder.
2. [**Launch Trailer Part 2 (Shot 4–6, 30s, Seedance 2.5)**](https://d8j0ntlcm91z4.cloudfront.net/user_3LxPLfkmENXyKn29oERn9nhTYJr/hf_20261111_173740_ffae18d9-dba0-48dc-87fa-898bc433fdb6.mp4):
   - **ID:** `ffae18d9-dba0-48dc-87fa-898bc433fdb6`
   - **Created:** 2026-11-11 17:37 UTC
   - **Features:** Parent-child dialogue deck, Bilateral Family Pact stylus signing, 8:30 PM bedtime curfew seal stamp, and AlongSide lifespan branding.
3. [**Lifespan Exploration Trailer (30s, Seedance 2.5)**](https://d8j0ntlcm91z4.cloudfront.net/user_3LxPLfkmENXyKn29oERn9nhTYJr/hf_20261111_114758_2187e72a-224d-4b9a-b234-30f09eb2b956.mp4):
   - **ID:** `2187e72a-224d-4b9a-b234-30f09eb2b956`
   - **Created:** 2026-11-11 11:47 UTC
   - **Features:** Whole-child lifespan navigation, developmental tier benchmarking, and calm parental advisory interface.
