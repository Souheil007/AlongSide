# AlongSide Demo Video — Quick-Copy Prompt Cheat Sheet
**Author:** Chief Technology Officer (CTO)  
**Target:** Fast copy-paste into Claude MCP or standalone AI video/image generators  
**Reference Specification:** [`docs/launch-demo-video-production-prompt-suite.md`](launch-demo-video-production-prompt-suite.md)  
**Task Reference:** SOU-101  

---

## 📋 Table of Contents
1. [One-Shot Master Prompt for Claude](#1-one-shot-master-prompt-for-claude)
2. [60-Second Flagship Trailer — Scene Video Prompts](#2-60-second-flagship-trailer--scene-video-prompts)
3. [30-Second Social Cut (9:16 Vertical) — Prompts](#3-30-second-social-cut-916-vertical--prompts)
4. [Keyframe Image Prompts (Midjourney / Flux)](#4-keyframe-image-prompts-midjourney--flux)
5. [Spoken Voiceover Scripts (Ready for ElevenLabs / TTS)](#5-spoken-voiceover-scripts-ready-for-elevenlabs--tts)

---

## 1. One-Shot Master Prompt for Claude

> **Instructions:** Copy the block below and paste it into your Claude conversation with the video/image MCP connector active.

```text
You are an expert AI video director and motion graphics producer. I want to create the official 60-second launch demo video for "AlongSide" (The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow, Ages 0–18).

Inspect your available image and video generation MCP tools and create the 6 scenes below in sequential order (16:9 widescreen, 4K, 24fps):

BRAND AESTHETICS:
- Visual Style: Editorial Pediatric Almanac (Warm natural sunlight, Archival Linen canvas #FBFBF9, Deep Forest Spruce #143D2B, dark ink typography, warm Scandinavian oak interiors).
- Non-Clinical: Educational child development, sleep habits, nutrition, brain play, and bilateral family pacts. Zero clinical emergency triage.
- Tone: Empathetic, calm, hopeful, premium documentary quality.

SCENES TO GENERATE:
1. Scene 1 (0-8s): Exhausted mother in dim nursery at 2:14 AM illuminated only by cold blue phone screen. Camera: Slow creeping dolly push-in.
2. Scene 2 (8-18s): Bright morning kitchen, warm sunlit oak table with iPad displaying AlongSide's Developmental Horizon arc (6 lifespan stages). Camera: Smooth crane down from window to screen.
3. Scene 3 (18-30s): Lifestyle montage: Father tucking in peaceful toddler; hands preparing colorful toddler food ladder; 7yo boy playing with wooden geometric blocks. Camera: Smooth lateral tracking with match-cuts.
4. Scene 4 (30-42s): Father in study consulting 24/7 AI Child Advisor on phone. Clean text stream animating on screen, dialogue card showing 'Say This, Not That'. Camera: Slow orbital arc.
5. Scene 5 (42-52s): Mother and 12yo son sitting side-by-side at kitchen table smiling, son signing digital Bilateral Family Pact with stylus. Status card: 'Bedtime Curfew Active: 8:30 PM Lock • Zero Spyware'. Camera: Push-in to top-down screen macro.
6. Scene 6 (52-60s): Backlit golden-hour shot of happy family laughing in an autumn meadow, dissolving to AlongSide brand lockup: 'Start Your Free 7-Day Family Pass'. Camera: Cinematic slow dolly-out.

Please inspect your tools, confirm your approach, and begin generating Scene 1!
```

---

## 2. 60-Second Flagship Trailer — Scene Video Prompts

### Scene 1: The 2:14 AM Insomnia (0:00 – 0:08)
```text
Cinematic 35mm film still of an exhausted mother in her early 30s sitting in a cozy dim nursery at 2:14 AM, illuminated by the harsh cold blue glow of her smartphone screen. In the soft-focus background, a wooden toddler crib with soft blankets. Shallow depth of field, f/1.8 lens, moody cinematic shadows, realistic skin texture, subtle tired expression, authentic emotional exhaustion. No stylized makeup, natural human vulnerability. Kodak Vision3 500T color grading, 4K photorealistic --ar 16:9 --style raw
[Motion Direction: Slow creeping dolly push-in toward face, slight rack focus to phone screen, 24fps]
[Negative Prompt: bright daylight, smiling, cartoon, 3d, cyberpunk, neon, distorted hands, stock photo]
```

### Scene 2: The Sanctuary Reveal (0:08 – 0:18)
```text
Cinematic wide shot of a bright modern minimalist kitchen bathed in soft golden morning sunlight streaming through sheer linen curtains. On a solid white oak breakfast table sits an elegant tablet displaying a refined parenting app with warm linen textures (#FBFBF9), deep spruce green badges (#143D2B), and a clean developmental timeline. Next to the tablet is a steaming ceramic mug of coffee. An approachable, relaxed mother in a warm knit sweater smiles gently as she looks at the screen. 50mm lens, f/2.8, warm airy atmosphere, architectural digest aesthetic, 4K ultra-detailed --ar 16:9 --style raw
[Motion Direction: Smooth crane-down from sunlit window to tabletop, subtle forward drift, 24fps]
[Negative Prompt: darkness, clutter, hospital clinic, clinical charts, neon buttons, blurry text, cartoon]
```

### Scene 3: Whole-Child Upbringing (0:18 – 0:30)
```text
A cinematic three-part lifestyle sequence of mindful modern parenting: first, a loving father gently tucking in a peaceful toddler under soft linen bedding; second, hands preparing vibrant fresh fruit and balanced finger foods on a clean kitchen cutting board; third, a focused 7-year-old child building an intricate geometric wooden tower on a wool rug in soft daylight. Natural documentary cinematography, warm Kodachrome tones, authentic family warmth, shallow depth of field, 4K resolution --ar 16:9
[Motion Direction: Lateral whip-pan from nursery to kitchen, followed by slow push-in on child playing on the rug, 24fps]
[Negative Prompt: crying baby, junk food, iPad babysitting, clutter, low quality, oversaturated]
```

### Scene 4: 24/7 AI Child Advisor & Dialogue Scripts (0:30 – 0:42)
```text
Over-the-shoulder cinematic medium close-up of a thoughtful 38-year-old father consulting his smartphone in a warm home office with bookshelves. The phone screen displays an elegant AI Advisor chat UI with crisp dialogue cards labeled 'Say This / Not That'. Warm ambient desk lamp light, shallow depth of field, focused expression, authentic fatherly care. 85mm portrait lens, f/2.0, 4K cinematic film still --ar 16:9
[Motion Direction: Slow orbital arc around father, rack focus to phone interface as text stream reveals, 24fps]
[Negative Prompt: robot face, sci-fi glowing circuits, angry screaming, aggressive confrontation]
```

### Scene 5: Bilateral Family Pact (0:42 – 0:52)
```text
A heartwarming, candid cinematic medium shot of a mother and her 12-year-old son sitting side-by-side at a dining table, sharing an iPad screen. The son is smiling as he signs a digital agreement with a stylus. The mother has her arm gently around the chair, looking proud and supportive. Natural daylight, warm wood kitchen, positive collaborative atmosphere. High-end documentary cinematography, 50mm lens, f/2.2, crisp details, natural skin tones --ar 16:9
[Motion Direction: Tracking push-in from two-shot to top-down macro of digital stylus signing pact, 24fps]
[Negative Prompt: handcuffs, surveillance camera, creepy spy graphics, sad child, crying, authoritarian]
```

### Scene 6: Resolution & Launch CTA (0:52 – 1:00)
```text
A breathtaking, golden hour wide cinematic shot of a happy diverse family laughing together in a meadow of tall grass and wildflowers, backlit by the warm setting sun. Natural lens flare, genuine joy, candid unposed emotion, cinematic anamorphic 2.39:1 letterbox, 4K resolution, ultra-clean commercial production value --ar 16:9
[Motion Direction: Slow cinematic dolly-out with gentle golden lens flare, dissolving cleanly into AlongSide brand card, 24fps]
[Negative Prompt: cheesy stock footage, artificial smiles, oversaturated, neon flash, abrupt cut]
```

---

## 3. 30-Second Social Cut (9:16 Vertical) — Prompts

### Shot 1: The 2 AM Hook (0:00 – 0:04)
```text
Vertical 9:16 cinematic close-up of a tired young mother holding her phone in bed in the dark, cold blue light reflecting on her face, exhausted expression, documentary style, shallow depth of field, 4k photorealistic --ar 9:16
[Motion: Quick punch-in to phone screen. On-Screen Text: 'STOP GOOGLING AT 2 AM']
```

### Shot 2: The Lifespan Horizon Shift (0:04 – 0:12)
```text
Vertical 9:16 macro shot of a sleek smartphone held in a clean hand, displaying a beautifully designed modern parenting app with warm linen background and emerald accents. Smooth thumb interaction, buttery UI animations, bright natural lighting --ar 9:16
[Motion: Top-down macro drift, thumb toggling child from toddler to pre-teen. On-Screen Text: 'ONE APP. AGES 0 TO 18.']
```

### Shot 3: AI Advisor In Action (0:12 – 0:22)
```text
Vertical 9:16 medium shot of a father sitting in the driver's seat of a parked car at dusk, holding his phone and reading a conversation script, warm dashboard light, natural candid expression, cinematic lighting --ar 9:16
[Motion: Passenger-seat camera drift, phone displaying clean empathy script. On-Screen Text: 'GET THE SCRIPT BEFORE YOU REACT']
```

### Shot 4: The Bilateral Pact & CTA (0:22 – 0:30)
```text
Vertical 9:16 warm shot of an energetic mother and her 12-year-old son sharing a happy fist-bump across a kitchen counter, sunny bright morning, positive family connection --ar 9:16
[Motion: Fast zoom to fist bump, dissolve to AlongSide logo. On-Screen Text: 'BILATERAL PACTS • ZERO SPYWARE • ALONGSIDE.CARE']
```

---

## 4. Keyframe Image Prompts (Midjourney / Flux)

For Image-to-Video workflows, generate these 8 foundational keyframe plates first:

```text
// KF-01: 2 AM Nightstand
Photorealistic 35mm photograph of a modern dimly lit master bedroom at 2:15 AM. On the wooden nightstand sits a sleek smartphone displaying a parenting forum with glowing blue-white text, illuminated beside a half-empty glass of water and a baby monitor glowing faint green. Soft textured linen sheets in foreground. Shallow depth of field, f/1.4, cinematic film grain, authentic moody atmosphere, 8k resolution --ar 16:9 --style raw --v 6.1

// KF-02: Sunlit Sanctuary
High-end architectural interior photography of a minimalist sun-drenched family dining room. A long natural white oak table features an iPad displaying a refined editorial app with spruce green headers and warm cream paper textures. Off-focus background shows potted olive tree and linen drapery. Crisp morning sunlight casting soft shadows. 50mm lens, f/4.0, Hasselblad H6D-100c medium format look, hyper-clean --ar 16:9 --style raw --v 6.1

// KF-03: Mother & Infant Bonding
A tender, candid documentary portrait of a 32-year-old mother cradling her 6-month-old baby in a sunlit nursery rocking chair. Both are calm and peaceful. Natural skin textures, soft cotton fabrics, warm earth tones (sage, cream, oatmeal). No studio lighting, pure soft north window light, 85mm portrait lens, f/1.8, emotional warmth --ar 16:9 --style raw --v 6.1

// KF-04: Tactile Block Play
Close-up dynamic angle of a 5-year-old boy's hands carefully placing the final wooden block onto a tall, intricate architectural tower on a beige textured wool rug. Natural daylight from the side, shallow depth of field, focused expression of concentration, authentic childhood play without screens, Leica M11 look, 4k --ar 16:9 --style raw --v 6.1

// KF-05: Father AI Advisor Guidance
Cinematic medium shot of an empathetic 39-year-old father standing near a window at twilight, consulting his smartphone screen displaying crisp dialogue cards labeled 'Say This / Not That'. Warm interior tungsten lighting contrasted with cool blue twilight outside. Contemplative, loving facial expression. 35mm anamorphic, f/2.0 --ar 16:9 --style raw --v 6.1

// KF-06: Shared Tablet Agreement
Candid, natural-light shot of a 12-year-old boy sitting beside his mother at a dining table, holding a digital pencil and signing his signature onto a tablet screen. Both are smiling with genuine warmth and mutual trust. High key natural lighting, modern Scandinavian interior, crisp details, Kodak Portra 400 aesthetic --ar 16:9 --style raw --v 6.1

// KF-07: Calm Curfew Screen
Extreme macro photograph of an iPhone screen lying flat on a walnut desk at 8:30 PM. The screen displays a tasteful, calm AlongSide notification: 'Bedtime Curfew Active. See you at 7:00 AM. Sleep well, Lucas.' Muted emerald background, minimal aesthetic, no red warning symbols or scary lock icons. Peaceful bedroom ambient lighting --ar 16:9 --style raw --v 6.1

// KF-08: AlongSide Brand Lockup
Minimalist graphic composition on an Archival Linen (#FBFBF9) backdrop with subtle paper grain texture. In the center, the AlongSide brand insignia in Deep Forest Spruce (#143D2B) accompanied by the elegant serif wordmark 'AlongSide'. Below: 'The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow (Ages 0-18)'. Underneath, a clean spruce pill CTA: 'Start Your Free Family Pass'. Premium editorial typography, 4K resolution --ar 16:9
```

---

## 5. Spoken Voiceover Scripts (Ready for ElevenLabs / TTS)

### 60-Second Flagship Script:
> *[0:00 - 0:08 | Tone: Intimate, quiet, vulnerable]*  
> "Every parent knows this feeling. It’s 2:00 in the morning. You’re exhausted, overwhelmed by conflicting advice, and wondering if you’re doing this right."  
>  
> *[0:08 - 0:18 | Tone: Warm, uplifting, confident]*  
> "Meet AlongSide. The first holistic child development and parenting sanctuary built for the entire lifespan—from birth all the way to age 18."  
>  
> *[0:18 - 0:30 | Tone: Practical, rhythmic, authoritative]*  
> "Not another baby tracker you delete at toddlerhood. AlongSide gives you pediatrician-backed guidance on sleep architecture, nutrition ladders, and screen-free cognitive play—calibrated to your child’s exact age and nervous system."  
>  
> *[0:30 - 0:42 | Tone: Reassuring, empathetic]*  
> "And when high-stakes moments happen, don't guess. Consult our 24/7 AI Child Advisor—grounded in pediatric psychology and developmental neurobiology, so you always know what to say before you walk into the room."  
>  
> *[0:42 - 0:52 | Tone: Collaborative, inspiring]*  
> "When it's time for their first phone, replace secret surveillance with mutual respect. A bilateral family pact signed together—enforced with calm, neutral automation and zero spyware."  
>  
> *[0:52 - 1:00 | Tone: Resonant, hopeful, clear call to action]*  
> "Stop guessing. Start understanding. Welcome to AlongSide. Start your free family pass today at Alongside.care."

---

### 30-Second Social Script:
> *[0:00 - 0:04]* "If you're still panic-Googling parenting advice at 2:00 in the morning, stop."  
> *[0:04 - 0:12]* "AlongSide isn't another baby tracker you delete at age two. It reconfigures across your child's entire life—from infant sleep to teenage slang."  
> *[0:12 - 0:22]* "Access clinical scripts tailored to your child with our 24/7 AI Advisor before you react."  
> *[0:22 - 0:30]* "Replace spyware with bilateral agreements. Try AlongSide free today at Alongside.care."
