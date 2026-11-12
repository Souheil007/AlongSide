# AlongSide Demo Videos — Higgsfield Seedance 2.5 Quick Runner & Prompt Cheat Sheet
**Author:** Chief Executive Officer (CEO)  
**Target:** 1-Click Terminal Execution & Instant Copy-Paste  
**Parent Specification:** [`docs/higgsfield-seedance-demo-video-prompts.md`](higgsfield-seedance-demo-video-prompts.md)  
**Task Reference:** Paperclip SOU-111  
**Engine:** Higgsfield AI — Seedance 2.5 (`seedance_2_5`) Free Tier (`480p`, `30s`, Native Audio)  

---

## ⚡ Quick-Start CLI Commands

### Video 1: "The Complete Parenting Sanctuary" (Platform Experience Tour)
```bash
higgsfield generate create seedance_2_5 \
  --prompt "A sleek 30-second product demo video showing the AlongSide parenting platform on an elegant tablet. Modern Scandinavian oak desk in warm morning sunlight. The camera glides smoothly across the UI in continuous motion: first showing the Developmental Horizon arc rotating smoothly across ages 0 to 18 with archival linen textures and deep spruce badges; next gliding into the Parent Intelligence Academy where a lesson card expands and a minimalist green soundwave player animates in real time; then transitioning to the Sunday Culture Digest with floating youth slang cards 'No Cap' and 'Rizz'; ending on the Bilateral Family Pact as a digital stylus signs the screen and an automated 8:30 PM Bedtime Curfew Lock badge illuminates with calm green light. Smooth 3D camera pan, shallow depth of field, premium Apple-style motion design. Synchronized native audio features a warm, reassuring conversational voiceover: \"Parenting moves fast. AlongSide gives you the calm ground to keep up. Whole-child guidance, bite-sized neurobiology, and neutral family agreements—from birth to eighteen. Welcome to your parenting sanctuary.\" Background music is a gentle, uplifting acoustic piano and cello melody with crisp tactile UI click and chime sound effects." \
  --resolution 480p \
  --duration 30 \
  --aspect_ratio 16:9 \
  --generate_audio true \
  --wait
```

---

### Video 2: "In The Moment — Crisis to Clarity" (Interactive Walkthrough)
```bash
higgsfield generate create seedance_2_5 \
  --prompt "A dynamic 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during an everyday family moment. Soft evening home office lighting. Handheld smartphone close-up as a parent types into the 24/7 AI Child Advisor: 'Daughter slammed door after school'. A deep spruce circular audio wave pulses fluidly as empathetic advice streams in. The screen smoothly expands into an interactive Dialogue Deck showing a side-by-side 'Say This / Not That' card comparison; a thumb taps the 'Copy Script' button with a tactile green checkmark animation. Camera smoothly transitions to a dual-device view of phone and tablet synchronizing the Bilateral Family Pact; a toggle slides to activate the neutral 8:30 PM Bedtime Curfew Lock with matching green checkmarks. Crisp modern UI animations, spring easing, shallow depth of field, Apple commercial aesthetic. Synchronized native audio includes an empathetic, authoritative voiceover: \"When high-stakes moments happen, don't guess. AlongSide gives you real-time neurobiology scripts, interactive dialogue decks, and neutral curfews that protect your relationship. Clarity in thirty seconds.\" Background audio features an intimate modern acoustic piano rhythm with realistic keyboard typing, card flip swooshes, and a realistic lock chime." \
  --resolution 480p \
  --duration 30 \
  --aspect_ratio 16:9 \
  --generate_audio true \
  --wait
```

---

## 📋 Raw Prompt Blocks (Copy-Paste)

### Prompt 1: Macro Platform Experience & Lifespan Tour (30 Seconds)
```text
A sleek 30-second product demo video showing the AlongSide parenting platform on an elegant tablet. Modern Scandinavian oak desk in warm morning sunlight. The camera glides smoothly across the UI in continuous motion: first showing the Developmental Horizon arc rotating smoothly across ages 0 to 18 with archival linen textures and deep spruce badges; next gliding into the Parent Intelligence Academy where a lesson card expands and a minimalist green soundwave player animates in real time; then transitioning to the Sunday Culture Digest with floating youth slang cards 'No Cap' and 'Rizz'; ending on the Bilateral Family Pact as a digital stylus signs the screen and an automated 8:30 PM Bedtime Curfew Lock badge illuminates with calm green light. Smooth 3D camera pan, shallow depth of field, premium Apple-style motion design. Synchronized native audio features a warm, reassuring conversational voiceover: "Parenting moves fast. AlongSide gives you the calm ground to keep up. Whole-child guidance, bite-sized neurobiology, and neutral family agreements—from birth to eighteen. Welcome to your parenting sanctuary." Background music is a gentle, uplifting acoustic piano and cello melody with crisp tactile UI click and chime sound effects.
```

### Prompt 2: Micro Crisis-to-Clarity Interactive Walkthrough (30 Seconds)
```text
A dynamic 30-second mobile UI product demo video showcasing the AlongSide parenting app in action during an everyday family moment. Soft evening home office lighting. Handheld smartphone close-up as a parent types into the 24/7 AI Child Advisor: 'Daughter slammed door after school'. A deep spruce circular audio wave pulses fluidly as empathetic advice streams in. The screen smoothly expands into an interactive Dialogue Deck showing a side-by-side 'Say This / Not That' card comparison; a thumb taps the 'Copy Script' button with a tactile green checkmark animation. Camera smoothly transitions to a dual-device view of phone and tablet synchronizing the Bilateral Family Pact; a toggle slides to activate the neutral 8:30 PM Bedtime Curfew Lock with matching green checkmarks. Crisp modern UI animations, spring easing, shallow depth of field, Apple commercial aesthetic. Synchronized native audio includes an empathetic, authoritative voiceover: "When high-stakes moments happen, don't guess. AlongSide gives you real-time neurobiology scripts, interactive dialogue decks, and neutral curfews that protect your relationship. Clarity in thirty seconds." Background audio features an intimate modern acoustic piano rhythm with realistic keyboard typing, card flip swooshes, and a realistic lock chime.
```

---

## 🎙️ Spoken Voiceover Reference Scripts

### Video 1 Voiceover (15 Seconds Read, Paced across 30s):
> *"Parenting moves fast. AlongSide gives you the calm ground to keep up. Whole-child guidance, bite-sized neurobiology, and neutral family agreements—from birth to eighteen. Welcome to your parenting sanctuary."*

### Video 2 Voiceover (14 Seconds Read, Paced across 30s):
> *"When high-stakes moments happen, don't guess. AlongSide gives you real-time neurobiology scripts, interactive dialogue decks, and neutral curfews that protect your relationship. Clarity in thirty seconds."*

---

## ⚙️ Model Parameter Reference

| Flag | Argument | Description |
| :--- | :--- | :--- |
| Model ID | `seedance_2_5` | SOTA video diffusion with native audio support |
| `--resolution` | `480p` | Free-tier default for rapid rendering |
| `--duration` | `30` | 30-second maximum duration clip |
| `--aspect_ratio` | `16:9` | Landscape video layout |
| `--generate_audio` | `true` | Synthesizes synchronized voiceover, score, and SFX |
| `--wait` | *(flag)* | Blocks until completion and outputs the final asset URL |
