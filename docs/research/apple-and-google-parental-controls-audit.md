# Apple & Google Built-In Parental Controls: Priority-Ranked Audit (Highest to Lowest Importance)

**Date:** November 2026  
**Scope:** Primary-source audit of native parental controls offered by **Apple** (Family Sharing + Screen Time on iOS / iPadOS) and **Google** (Family Link + Android / Chrome / YouTube / SafetyCore).  
**Purpose:** Inform Alongside's `/devices` OS Parental Control Blueprints so parents configure the highest-leverage protections first instead of getting lost in 40+ buried settings.

---

## Ranking Methodology

Features are ranked from **#1 (Highest Importance — Without This, Other Controls Break or Severe Harm Occurs)** down to **#18 (Lowest Importance — Convenience & Secondary Polish)** across six impact tiers:

1. **Tier 1 — Anti-Tamper Foundation (Ranks 1–2):** Prevents kids from turning off controls, creating alternate accounts, or sideloading bypass apps.
2. **Tier 2 — Predators, Groomers & Explicit Content (Ranks 3–6):** Stops the highest-severity online harms (pornography, explicit photos, stranger messaging, unsafe web searches).
3. **Tier 3 — App Gatekeeping & Spending Lock (Ranks 7–9):** Prevents secret downloads of risky apps (social feeds, decoy vaults, third-party browsers) and accidental purchases.
4. **Tier 4 — Sleep, School & Addiction Guardrails (Ranks 10–13):** Solves the daily friction parents actually struggle with (bedtime sleep loss, classroom distraction, Shorts/TikTok bingeing).
5. **Tier 5 — Physical & Location Safety (Ranks 14–15):** Real-time whereabouts, arrival/departure alerts, and driving safety.
6. **Tier 6 — Health, Privacy & Convenience Extras (Ranks 16–18):** Hearing/eye protection, data privacy toggles, and family allowance/device utilities.

---

## Complete Ranked Matrix (Highest → Lowest Importance)

### Tier 1 — Anti-Tamper Foundation (Configure First, or Everything Else Fails)

| Rank | Control Capability | Apple (iPhone / iPad — Screen Time + Family Sharing) | Google (Android / Chromebook — Family Link) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Child Account + Tamper Lock / Admin Passcode** | Dedicated **Child Apple Account** in Family Sharing + separate 4-digit **Screen Time Passcode** (*Lock Screen Time Settings*) + lock **Passcode Changes** & **Account Changes** (*Don't Allow*). | **Family Link Supervised Google Account** managed from parent device (Android, iPhone, or `familylink.google.com`) + **Factory Reset Protection (FRP)** requiring parent verification. | Without a separate admin lock, a child can toggle restrictions off, change their unlock passcode, or sign out of the supervised account in seconds. |
| **2** | **Block Bypasses: Sideloading, App Deletion & Alt Accounts** | Under *Content & Privacy Restrictions → iTunes & App Store Purchases*, set **Deleting Apps** to *Don't Allow* (prevents deleting/reinstalling apps to reset timers) and disable unauthorized account changes. | Family Link automatically locks **Apps from Unknown Sources (sideloading APKs)** and **Developer Options** by default, blocking unverified installs outside Play Store. | Stops the #1 tween workaround: installing unreviewed APKs, third-party unfiltered browsers, or deleting/reinstalling apps to wipe Screen Time rules. |

---

### Tier 2 — Predators, Groomers & Explicit Content (Highest Harm Prevention)

| Rank | Control Capability | Apple (Screen Time) | Google (Family Link + Android) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **3** | **Explicit Media Detection & Blurring (Nudity / Gore)** | **Communication Safety** (on-device ML): blurs nudity, gore, and violent imagery across **Messages, AirDrop, live FaceTime calls & video messages, Contact Posters, and Shared Photo Albums**; displays age-appropriate help prompts without breaking E2EE. | **Sensitive Content Warnings** in **Google Messages** (on-device via Android SafetyCore): automatically detects and blurs nude photos/videos sent or received. Locked **ON** by default for Family Link supervised kids (child cannot toggle off). | Directly interrupts sextortion, unsolicited explicit images, and grooming escalations before a child sees the image. |
| **4** | **Web & Adult Content Filtering (No Private/Incognito Bypass)** | **Web Content** filter (*Limit Adult Websites* or strict *Allowed Websites Only* + **Ask to Browse** requests in Safari). Automatically locks out **Safari Private Browsing**; Siri Web Search can also be disabled. | **Google Chrome** filters (*Try to block explicit sites* or *Only allow approved sites*), **Incognito Mode automatically disabled**, and **Google SafeSearch** locked ON for explicit search results. | Blocks pornography, violent sites, and explicit search results while closing the Incognito/Private Browsing loophole. |
| **5** | **Stranger Contact & Messaging Lock** | **Communication Limits**: restricts Phone, FaceTime, Messages, and iCloud contacts to **Contacts Only** (with parent approval required for new contacts) during Screen Time and **Specific Contacts** during Downtime; **AirDrop** locked to *Off* or *Contacts Only*. | **Parent-Managed Contacts** (Android): parents choose and approve the exact contacts a child can call or text directly from the Family Link app, reviewing incoming contact requests. | Stops strangers from calling, texting, or AirDropping a child's device. *(Note: does NOT control DMs inside third-party apps like Roblox, Discord, or Instagram.)* |
| **6** | **YouTube & Streaming Age / Content Tiers** | Managed via **Content Restrictions** (*Movies, TV Shows, Music, Books, Podcasts* age ratings + *Explicit Language* OFF) and paired with YouTube's own supervised account settings. | Deep native **YouTube Kids** and **YouTube Supervised Experiences** (*Explore 9+*, *Explore More 13+*, *Most of YouTube*) managed directly inside Family Link, plus disabling public uploads and live chat. | YouTube is the #1 video platform for ages 4–16; unsupervised autoplay rapidly escalates kids toward inappropriate or hyper-stimulating content. |

---

### Tier 3 — App Gatekeeping & Spending Control

| Rank | Control Capability | Apple (Screen Time + Family Sharing) | Google (Family Link + Google Play) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Parent Approval for Every App Download (Free & Paid)** | **Ask to Buy** (Family Sharing): sends parent a push/Messages request showing the exact app and age rating before any free or paid App Store download. Can also set *Installing Apps → Don't Allow* for younger kids. | **Google Play Purchase & Download Approvals**: requires parent approval for *All content* (including free apps) before installation, plus ability to hide/block already-installed apps remotely. | The single strongest defense against social media, anonymous chat apps, decoy "calculator vault" apps, and alternate unfiltered browsers. |
| **8** | **App Store Age-Rating Ceiling** | Revamped **5-tier App Store age ratings** (**4+, 9+, 13+, 16+, 18+**, replacing legacy 12+/17+) + **Declared Age Range API** (shares age bracket privately with apps upon parent consent). Apps above the ceiling are hidden/blocked. | **Google Play Content Ratings** (ESRB / PEGI / IARC maturity ceilings for Apps & Games, Movies, TV, Books) configured inside Family Link. | Prevents mature social apps, gambling simulators, and adult-rated games from even appearing or installing. |
| **9** | **In-App Purchase & Spending Block** | Under *iTunes & App Store Purchases*, set **In-App Purchases → Don't Allow** (or enforce *Always Require Password*), blocking accidental Robux/V-Bucks/loot-box bills. | Google Play approval setting for **in-app purchases** (require parent approval for every purchase or block payment methods entirely). | Prevents surprise $100+ game-currency bills and predatory microtransaction loops. |

---

### Tier 4 — Sleep, School & Addiction Guardrails

| Rank | Control Capability | Apple (Screen Time) | Google (Family Link) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **10** | **Bedtime Downtime (Automatic Nightly Lock)** | **Downtime**: scheduled nightly lock (e.g., 8:30 PM – 6:30 AM) with **Block at Downtime** ON; only **Always Allowed** apps (Phone, emergency contacts, e.g., Mom/Dad) remain usable. | **Downtime / Bedtime Schedule**: automatically locks Android/Chromebook overnight on customizable weekday/weekend schedules while allowing phone/emergency calls. | Protects melatonin, REM sleep, and mood while removing the parent from being the nightly "bad guy" taking the phone away. |
| **11** | **Daily Screen Time & Per-App Time Limits** | **App Limits**: daily caps by app category (*Social, Games, Entertainment*) or individual app + **Block at End of Limit** ON + **Ask for More Time** remote requests. | **Daily Device Limit** (total phone/tablet hours per day) **plus individual App Limits** (block, cap per app, or mark educational apps *Always Allowed*) + remote **Bonus Time** & **Instant Lock Now** button. | Kids (and adults) cannot self-regulate against algorithmic feeds by watching the clock; OS enforcement stops bingeing neutrally. |
| **12** | **School Hours / Classroom Focus Lock** | Achievable via **Focus / Schooltime** (Apple Watch for Your Kids) or scheduling secondary **Downtime** / **App Limits** blocks during school hours. | Native **School Time Mode** directly on **Android phones & tablets** (and supported watches): switches phone to a stripped-down home screen, silences notifications, allows only approved school apps, and supports lunch/recess breaks. | Stops classroom notifications, sneaking games in class, and homework distraction without disabling parent calls. |
| **13** | **Short-Form Video (Shorts) Feed Cap** | No native OS-level Shorts-only cap (relies on YouTube app limit or setting the timer inside YouTube Family Center). | Native **YouTube Shorts Daily Feed Limit** via Family Link / YouTube Family Center — parents can set a daily timer **all the way down to 0 minutes** to disable Shorts scrolling while keeping long-form YouTube videos available. | Directly targets the highest-dopamine endless-scroll mechanic on kids' devices without banning educational YouTube entirely. |

---

### Tier 5 — Physical & Location Safety

| Rank | Control Capability | Apple (Family Sharing) | Google (Family Link) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **14** | **Real-Time GPS Location & Geofence Alerts** | **Find My** (Family Sharing): live device location on map, **Notify When Arrives/Leaves** place alerts (school, home), play sound on lost device, plus lock *Share My Location* changes behind Screen Time passcode. | **Family Link Location**: live Android GPS map, **Family Places** arrival/departure notifications, remote loud ring (even on silent), and live **battery level** visibility. | High peace-of-mind for walking to school, sports practices, and emergencies — especially once kids travel independently. |
| **15** | **Teen Driving Distraction Lock** | **Driving Focus** + Screen Time *Allow Changes → Driving Focus → Don't Allow* locks automatic notification/text silencing while driving or connected to CarPlay. | **Android Driving Mode** / Do Not Disturb while driving (configured on device; less rigidly lockable via Family Link than iOS Driving Focus). | Critical for ages 16–18 (new drivers); low relevance under age 15. |

---

### Tier 6 — Health, Privacy & Convenience Extras (Lowest Priority)

| Rank | Control Capability | Apple (Screen Time + Family Sharing) | Google (Family Link) | Why It Matters |
| :--- | :--- | :--- | :--- | :--- |
| **16** | **App Permissions, Built-in Features & Game Center Restrictions** | **Allowed Apps & Features** (hide Safari, Camera, FaceTime, AirDrop, Mail, Wallet); **Privacy locks** (Contacts, Photos, Microphone, Bluetooth); **Game Center** (block multiplayer games, adding friends, **Screen Recording**). | **App Permissions** review (toggle camera, mic, location, contacts per app); **Third-Party App Google Account Access** controls; **Chrome Extensions** block on Chromebooks; **Google Assistant** restricted to "For Families" actions. | Useful fine-tuning (e.g., hiding Safari completely for an 8-year-old or blocking Game Center multiplayer strangers), secondary to Ranks 1–11. |
| **17** | **Eye & Hearing Physical Health Guardrails** | **Screen Distance** (Face ID alert when holding iPhone/iPad closer than ~12 inches to reduce myopia risk) + **Reduce Loud Audio** decibel cap locked in Screen Time. | Digital Wellbeing basics (grayscale/Bedtime mode); no native camera-based screen-distance myopia alert equivalent to Apple's Face ID Screen Distance. | Nice pediatric health bonus, especially for younger tablet users wearing headphones. |
| **18** | **Allowance, Activity Reports & Account Lifecycle Utilities** | **Apple Cash Family** (allowance, spending alerts, lock card); weekly Screen Time pickup/usage charts; automatic child account defaults under 13. | Weekly/monthly app usage reports; remote password reset; Google Account **Activity Controls** (pause Web/App/YouTube history); **Age 13 "Graduation"** notice (in current Google policy, teens over 13 can request stopping supervision, with parent notification/approval workflows varying by region until 18). | Administrative polish; helpful once core safety controls are locked in. |

---

## Critical Blind Spots: What NEITHER Apple Nor Google Solves Alone

Even if a parent turns on **every single setting above**, four real-world gaps remain — which is exactly where Alongside's guidance adds irreplaceable value:

1. **Inside Third-Party Apps (The Biggest Gap):** Neither Apple Screen Time nor Google Family Link reaches *inside* **Roblox** (game chat, voice chat, content maturity), **Discord**, **Snapchat**, **Instagram**, **TikTok**, or **Minecraft Realms**. Those must either be **blocked at the App Store gate** (Rank 7) or **locked down inside each app's own settings**.
2. **Mixed-OS Households (Apple Parent ↔ Android Child, or Android Parent ↔ iPhone Child):**
   - **iPhone parent + Android child:** Works well — Google Family Link has an iOS parent app and web dashboard (`familylink.google.com`).
   - **Android parent + iPhone child:** **Major Apple gap** — Apple Family Sharing cannot be remotely managed from an Android phone; the parent must configure Screen Time **directly on the child's iPhone** locked with a Screen Time passcode.
3. **Alternate Browsers, VPNs & Non-Managed Devices:** On Android/Chromebooks/PCs, third-party browsers or VPN apps can bypass Chrome filters if App Approvals aren't locked; on gaming consoles (Switch, PlayStation, Xbox) and smart TVs, neither Apple nor Google applies — **Home Router / Safe DNS (`1.1.1.3` or NextDNS)** is required to cover the whole house.
4. **Screen Time Sync Glitches & Teen Workarounds:** Apple Screen Time is well-known among parents for occasional iCloud sync bugs or time-zone tricks; locking **Date & Time** (Location Services → System Services → Setting Time Zone), **Account Changes**, and **Deleting Apps** closes the most common exploits.

---

## Primary Sources Cited

- **Apple Support:** *Use parental controls on your child's iPhone and iPad* (`support.apple.com` — Screen Time Passcode, Content & Privacy Restrictions, iTunes & App Store Purchases, Allowed Apps, Communication Limits, Screen Distance, Reduce Loud Audio, Passcode & Account Changes, Driving Focus).
- **Apple Families & Child Safety:** *Apple Families* & *Helping Protect Kids Online* (`apple.com` — Family Sharing Child Accounts, Communication Safety across Messages/AirDrop/FaceTime/Shared Albums, Ask to Buy, Ask to Browse, 5-tier App Store age ratings `4+/9+/13+/16+/18+`, Declared Age Range API, Apple Cash Family, Find My).
- **Google Families & Family Link Help:** *Google Family Link* (`families.google`, `safety.google`, `support.google.com` — Daily Limits, App Limits, Downtime, School Time, Play Store Approvals & Content Ratings, Chrome Filters & Incognito Lock, SafeSearch, Location & Geofencing, Unknown Sources / Developer Options lock, Factory Reset Protection, Third-Party App Controls, Chrome Extensions, Google Assistant Family Actions, Age 13 Graduation & Supervision).
- **Google Blog & Safety Updates:** *Android & Family Link Updates* (`blog.google`, `support.google.com` — School Time Mode for Android phones/tablets, Parent-Managed Contacts, Android SafetyCore Sensitive Content Warnings in Google Messages, YouTube Family Center Shorts Feed Daily Limit down to 0 minutes).
