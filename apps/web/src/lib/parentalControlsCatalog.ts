/**
 * Age-Calibrated OS & App Parental Controls Catalog
 * Priority-ranked from highest impact (Anti-Tamper → Predators/Adult Content → App Gatekeeping →
 * Time/Shorts Caps → Bedtime/School Lock) based on primary Apple Screen Time & Google Family Link docs.
 */

export type DevicePlatformId =
  | 'apple_ios'
  | 'android_family_link'
  | 'roblox'
  | 'youtube'
  | 'home_dns';

export type ControlGoalId =
  | 'tamper_lock'
  | 'adult_content'
  | 'strangers_dms'
  | 'app_approvals'
  | 'time_limits'
  | 'bedtime_downtime';

export interface ControlGoalMeta {
  id: ControlGoalId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface DevicePlatformMeta {
  id: DevicePlatformId;
  name: string;
  osLabel: string;
  tagline: string;
  setupMinutes: number;
  mixedOsTip?: string;
  calmNote: string;
}

export interface ControlBlueprintStep {
  id: string;
  platformId: DevicePlatformId;
  goalId: ControlGoalId;
  title: string;
  protectsAgainst: string;
  menuPath: string[];
  recommendedSetting: string;
  whyItMatters: string;
}

export const CONTROL_GOALS: ControlGoalMeta[] = [
  {
    id: 'tamper_lock',
    label: 'Prevent bypasses & lock settings',
    shortLabel: 'Anti-bypass lock',
    description: 'Lock admin passcode, app deletion, account changes, and APK sideloading.',
  },
  {
    id: 'adult_content',
    label: 'Block adult & explicit content',
    shortLabel: 'Adult content',
    description: 'Filter adult & explicit websites, mature search results, and disable Private/Incognito mode.',
  },
  {
    id: 'strangers_dms',
    label: 'Stop strangers & explicit media',
    shortLabel: 'Strangers & DMs',
    description: 'Blur nude/explicit photos on-device and lock calls, texts, AirDrop, and game chat.',
  },
  {
    id: 'app_approvals',
    label: 'Approve apps & block purchases',
    shortLabel: 'Apps & spending',
    description: 'Require parent approval before installing any app or buying in-game currency.',
  },
  {
    id: 'time_limits',
    label: 'Cap daily time & Shorts',
    shortLabel: 'Time & Shorts caps',
    description: 'Enforce daily app budgets and YouTube Shorts timers (down to 0 min) at the OS level.',
  },
  {
    id: 'bedtime_downtime',
    label: 'Lock bedtime & school hours',
    shortLabel: 'Bedtime & school',
    description: 'Auto-lock distractions at bedtime and during class while keeping parent & 911 calls open.',
  },
];

export const DEVICE_PLATFORMS: DevicePlatformMeta[] = [
  {
    id: 'apple_ios',
    name: 'iPhone & iPad',
    osLabel: 'Apple Screen Time · iOS / iPadOS',
    tagline: 'Free built-in Apple controls managed via Family Sharing or directly on the device.',
    setupMinutes: 6,
    mixedOsTip:
      'Parent on Android? Apple does not support remote Family Sharing from Android. Apply these steps directly on your child’s iPhone locked with a Screen Time passcode.',
    calmNote:
      'Tell your child plainly: “I turned on Apple’s safety filters and bedtime lock so your phone blocks adult content and protects your sleep automatically.”',
  },
  {
    id: 'android_family_link',
    name: 'Android Phone & Tablet',
    osLabel: 'Google Family Link · Android',
    tagline: 'Free Google OS controls for Chrome, Messages safety, Play approvals, School Time, and bedtime.',
    setupMinutes: 6,
    mixedOsTip:
      'Parent on iPhone? Works cleanly: install the free Google Family Link parent app on your iPhone or manage from familylink.google.com.',
    calmNote:
      'Tell your child plainly: “Family Link handles app approvals, school focus, and bedtime lock automatically so we don’t have to argue about the clock.”',
  },
  {
    id: 'roblox',
    name: 'Roblox',
    osLabel: 'Roblox Account & Maturity Controls',
    tagline: 'OS controls do not reach inside Roblox. Lock chat, voice, maturity, and Robux with a linked Parent Account.',
    setupMinutes: 3,
    calmNote:
      'Tell your child plainly: “You can play age-appropriate games, and we keep stranger chats and spending locked so nobody online can scam or pressure you.”',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    osLabel: 'YouTube Supervised & Shorts Controls',
    tagline: 'Stop autoplay rabbit holes, live chat, mature videos, and endless Shorts loops.',
    setupMinutes: 3,
    calmNote:
      'Tell your child plainly: “YouTube’s feed is engineered to keep adults scrolling too. These limits cut out Shorts loops and junk recommendations.”',
  },
  {
    id: 'home_dns',
    name: 'Home Wi-Fi & Safe DNS',
    osLabel: 'Cloudflare Family (1.1.1.3) / NextDNS',
    tagline: 'Covers what OS controls miss: game consoles, smart TVs, laptops, and every home browser.',
    setupMinutes: 4,
    calmNote:
      'Runs silently at the router or device DNS layer, blocking adult domains, proxies, and malware across every screen at home.',
  },
];

export function getRecommendedCurfew(age: number): {
  time24: string;
  time12: string;
  rationale: string;
} {
  if (age < 9) {
    return {
      time24: '20:00',
      time12: '8:00 PM',
      rationale: 'Elementary sleep protection (8:00 PM downtime, 9–11 hours required)',
    };
  }
  if (age <= 12) {
    return {
      time24: '20:30',
      time12: '8:30 PM',
      rationale: 'Pre-teen melatonin protection (8:30 PM downtime, bedroom screen-free)',
    };
  }
  return {
    time24: '21:30',
    time12: '9:30 PM',
    rationale: 'Teen circadian sleep protection (9:30 PM downtime, emergency calls open)',
  };
}

export function getRecommendedDailyCap(age: number): string {
  if (age <= 6) return '30–45 min/day (co-viewed)';
  if (age <= 9) return '1 hr/day on school days';
  if (age <= 12) return '1.5 hrs/day on school days';
  return '2 hrs/day recreational cap';
}

export function getDefaultGoalsForAge(age: number): ControlGoalId[] {
  if (age <= 12) {
    return [
      'tamper_lock',
      'adult_content',
      'strangers_dms',
      'app_approvals',
      'time_limits',
      'bedtime_downtime',
    ];
  }
  return ['tamper_lock', 'adult_content', 'strangers_dms', 'time_limits', 'bedtime_downtime'];
}

export function getCalibratedControlSteps(
  platformId: DevicePlatformId,
  selectedGoals: ControlGoalId[],
  age: number
): ControlBlueprintStep[] {
  const curfew = getRecommendedCurfew(age);
  const dailyCap = getRecommendedDailyCap(age);
  // Apple revamped 5-tier App Store age ratings: 4+, 9+, 13+, 16+, 18+
  const iosAppRating = age <= 8 ? '4+ or 9+' : age <= 12 ? '9+' : age <= 15 ? '13+' : '16+';
  const playAgeRating = age <= 8 ? 'Everyone (E)' : age <= 12 ? 'Everyone 10+ (E10+)' : 'Teen (T)';
  const robloxMaturity = age <= 8 ? 'Minimal' : age <= 12 ? 'Mild' : 'Moderate';

  const catalogByPlatform: Record<DevicePlatformId, ControlBlueprintStep[]> = {
    apple_ios: [
      {
        id: 'ios-tamper-lock',
        platformId: 'apple_ios',
        goalId: 'tamper_lock',
        title: 'Lock Screen Time passcode, account changes & app deletion',
        protectsAgainst: 'Priority 1 · Kids disabling controls',
        menuPath: [
          'Settings',
          'Screen Time',
          'Lock Screen Time Settings',
          'Content & Privacy → Allow Changes',
        ],
        recommendedSetting:
          'Set a unique 4-digit Screen Time passcode (linked to YOUR Apple Account for recovery). Then set Passcode Changes, Account Changes, and iTunes → Deleting Apps to "Don’t Allow".',
        whyItMatters:
          'Without this lock, kids can change their passcode, sign out of Family Sharing, or delete and reinstall apps to wipe out time limits.',
      },
      {
        id: 'ios-adult-web',
        platformId: 'apple_ios',
        goalId: 'adult_content',
        title: 'Block adult websites, explicit search & mature media',
        protectsAgainst: 'Priority 2 · Adult & explicit websites',
        menuPath: [
          'Settings',
          'Screen Time',
          'Content & Privacy Restrictions',
          'App Store, Media, Web & Games',
          'Web Content',
        ],
        recommendedSetting:
          age <= 9
            ? `Select "Allowed Websites Only" (with Ask to Browse), set Apps to ${iosAppRating}, and turn OFF Siri Web Search.`
            : `Select "Limit Adult Websites", set Apps to ${iosAppRating}, and disable Explicit Language, Music & Podcasts.`,
        whyItMatters:
          'Applies across Safari and in-app browsers and automatically disables Private Browsing so filters cannot be sidestepped.',
      },
      {
        id: 'ios-strangers-comm',
        platformId: 'apple_ios',
        goalId: 'strangers_dms',
        title: 'Turn on Communication Safety & lock unknown contacts',
        protectsAgainst: 'Priority 3 · Strangers, groomers & explicit media',
        menuPath: [
          'Settings',
          'Screen Time',
          'Communication Safety & Communication Limits',
        ],
        recommendedSetting:
          age <= 12
            ? 'Turn ON Communication Safety (blurs nudity & gore in Messages, AirDrop, live FaceTime & Shared Albums). Set Communication Limits to "Contacts Only" and AirDrop to "Receiving Off" or "Contacts Only".'
            : 'Keep Communication Safety ON (on-device nudity/gore blur across Messages, FaceTime & AirDrop) and AirDrop set to "Contacts Only".',
        whyItMatters:
          'Blurs explicit images on-device before your child sees them, requires parent approval for new contacts, and stops stranger AirDrops.',
      },
      {
        id: 'ios-app-approvals',
        platformId: 'apple_ios',
        goalId: 'app_approvals',
        title: 'Require Ask to Buy for every app & block in-app purchases',
        protectsAgainst: 'Priority 4 · Unapproved apps & surprise bills',
        menuPath: ['Settings', 'Family', 'Child Profile', 'Ask to Buy'],
        recommendedSetting:
          age <= 12
            ? 'Turn ON Ask to Buy (covers free & paid apps), and under Content & Privacy → iTunes & App Store Purchases set "In-App Purchases" to Don’t Allow.'
            : 'Turn ON Ask to Buy so every new social, browser, or messaging app sends an approval tap straight to your phone.',
        whyItMatters:
          'Blocks secret downloads of social apps, unfiltered third-party browsers, decoy calculator vaults, and $100 game-currency charges.',
      },
      {
        id: 'ios-time-limits',
        platformId: 'apple_ios',
        goalId: 'time_limits',
        title: 'Set OS-enforced daily App Limits',
        protectsAgainst: 'Priority 5 · Endless scrolling & game bingeing',
        menuPath: ['Settings', 'Screen Time', 'App Limits', 'Add Limit'],
        recommendedSetting: `Cap Games, Social & Entertainment at ${dailyCap}, and toggle "Block at End of Limit" ON.`,
        whyItMatters:
          'Kids should not have to fight billion-dollar algorithms by watching the clock. iOS ends the session neutrally.',
      },
      {
        id: 'ios-bedtime-downtime',
        platformId: 'apple_ios',
        goalId: 'bedtime_downtime',
        title: `Schedule automatic ${curfew.time12} Bedtime Downtime`,
        protectsAgainst: 'Priority 6 · Late-night phone use & sleep loss',
        menuPath: ['Settings', 'Screen Time', 'Downtime', 'Scheduled'],
        recommendedSetting: `Set ${curfew.time12} to 6:30 AM, toggle "Block at Downtime" ON, and allow Mom/Dad under "Always Allowed".`,
        whyItMatters:
          'Pauses games, social feeds, and browsers automatically every night while keeping parent and emergency 911 calls open 24/7.',
      },
    ],
    android_family_link: [
      {
        id: 'and-tamper-lock',
        platformId: 'android_family_link',
        goalId: 'tamper_lock',
        title: 'Block APK sideloading, Developer Options & unauthorized accounts',
        protectsAgainst: 'Priority 1 · Bypassing Play Store & controls',
        menuPath: [
          'Family Link App',
          'Controls',
          'Signed-in Devices',
          'Apps from Unknown Sources & Developer Options',
        ],
        recommendedSetting:
          'Keep "Apps from unknown sources" OFF, Developer Options OFF, and "Add/remove users" blocked so supervision stays locked on the device.',
        whyItMatters:
          'Stops kids from sideloading unreviewed APKs or unfiltered browsers outside Google Play and preserves Factory Reset Protection.',
      },
      {
        id: 'and-adult-chrome',
        platformId: 'android_family_link',
        goalId: 'adult_content',
        title: 'Lock Chrome explicit filter, SafeSearch ON & Incognito OFF',
        protectsAgainst: 'Priority 2 · Adult websites & explicit search',
        menuPath: [
          'Family Link App',
          'Controls',
          'Content Restrictions',
          'Google Chrome & Google Search',
        ],
        recommendedSetting:
          age <= 9
            ? 'Set Chrome to "Only allow approved sites" and lock Google SafeSearch ON (Incognito Mode is disabled automatically).'
            : 'Set Chrome to "Try to block explicit sites", lock Google SafeSearch ON, and keep alternative unfiltered browsers blocked.',
        whyItMatters:
          'Filters adult websites and graphic search results while closing the Incognito Mode loophole automatically.',
      },
      {
        id: 'and-strangers-privacy',
        platformId: 'android_family_link',
        goalId: 'strangers_dms',
        title: 'Lock Parent-Managed Contacts & Messages Sensitive Content Warnings',
        protectsAgainst: 'Priority 3 · Strangers, groomers & nude images',
        menuPath: [
          'Family Link App',
          'Controls',
          'Parent-Managed Contacts & Google Messages Safety',
        ],
        recommendedSetting:
          age <= 12
            ? 'Add approved family/friends in Parent-Managed Contacts (blocks calls/texts from strangers) and confirm Google Messages Sensitive Content Warnings stays ON.'
            : 'Confirm Google Messages Sensitive Content Warnings stays ON (on-device nudity blur via SafetyCore) and block unapproved chat apps.',
        whyItMatters:
          'Blurs nude images on-device before your child sees them and restricts calls and SMS strictly to parent-approved contacts.',
      },
      {
        id: 'and-app-approvals',
        platformId: 'android_family_link',
        goalId: 'app_approvals',
        title: 'Require Play Store approval for all downloads & purchases',
        protectsAgainst: 'Priority 4 · Unapproved apps & microtransactions',
        menuPath: ['Family Link App', 'Controls', 'Content Restrictions', 'Google Play'],
        recommendedSetting: `Set Purchase & Download Approvals to "All content" (even free apps) and cap Apps & Games at ${playAgeRating}.`,
        whyItMatters:
          'Sends an instant approval alert to your phone before any new app, alternate browser, or in-app purchase installs.',
      },
      {
        id: 'and-time-limits',
        platformId: 'android_family_link',
        goalId: 'time_limits',
        title: 'Set daily device limit & per-app caps',
        protectsAgainst: 'Priority 5 · Loss of track of time in games & video',
        menuPath: ['Family Link App', 'Screen Time', 'Daily Limit & App Limits'],
        recommendedSetting: `Set a total recreational cap of ${dailyCap} plus tighter per-app limits on YouTube, Roblox, or games (mark school apps Always Allowed).`,
        whyItMatters:
          'Android locks apps automatically when time runs out, and you can remotely grant bonus time or tap "Lock Now" from your own phone.',
      },
      {
        id: 'and-bedtime-downtime',
        platformId: 'android_family_link',
        goalId: 'bedtime_downtime',
        title: `Turn on ${curfew.time12} Bedtime Downtime & Android School Time`,
        protectsAgainst: 'Priority 6 · Late-night scrolling & class distraction',
        menuPath: ['Family Link App', 'Screen Time', 'Downtime & School Time'],
        recommendedSetting: `Schedule nightly Downtime at ${curfew.time12}–6:30 AM and enable School Time during class hours (silences alerts, shows approved school apps only, with lunch break windows).`,
        whyItMatters:
          'Protects both overnight sleep and classroom focus automatically while keeping parent and emergency calls open.',
      },
    ],
    roblox: [
      {
        id: 'rbx-tamper-parent',
        platformId: 'roblox',
        goalId: 'tamper_lock',
        title: 'Link a verified Parent Account to lock Roblox controls',
        protectsAgainst: 'Priority 1 · Child changing Roblox safety rules',
        menuPath: ['Roblox Settings', 'Parental Controls', 'Link Parent Account'],
        recommendedSetting:
          'Create and link your own ID/card-verified Parent Account so your child cannot raise maturity ratings, re-enable chat, or edit spending limits.',
        whyItMatters:
          'Roblox moved away from simple 4-digit PINs. Linking a Parent Account lets you manage settings remotely from your own phone.',
      },
      {
        id: 'rbx-adult-maturity',
        platformId: 'roblox',
        goalId: 'adult_content',
        title: 'Cap Content Maturity for user-generated games',
        protectsAgainst: 'Priority 2 · Violent, horror & mature experiences',
        menuPath: ['Roblox Settings', 'Parental Controls', 'Content Maturity'],
        recommendedSetting: `Cap Content Maturity at "${robloxMaturity}" (blocking Restricted and higher-maturity user games).`,
        whyItMatters:
          'Roblox is user-generated. Locking Content Maturity keeps horror, graphic, and mature worlds out of search and recommendations.',
      },
      {
        id: 'rbx-strangers-chat',
        platformId: 'roblox',
        goalId: 'strangers_dms',
        title: 'Turn OFF direct messages, experience chat & voice chat',
        protectsAgainst: 'Priority 3 · Groomers, scammers & toxic voice lobbies',
        menuPath: [
          'Roblox Settings',
          'Parental Controls',
          'Communication',
          'Experience Chat & Direct Chat',
        ],
        recommendedSetting:
          age <= 12
            ? 'Set Direct Chat to "No one", Experience Chat to "No one", and disable Voice Chat & Private Servers.'
            : 'Set Direct Chat to "Friends" only, disable Voice Chat, and review their Friends list together monthly.',
        whyItMatters:
          'Predators and Robux scammers rely on open Roblox chat to move kids onto Discord or private messaging apps.',
      },
      {
        id: 'rbx-spending',
        platformId: 'roblox',
        goalId: 'app_approvals',
        title: 'Set a $0 monthly Robux spending cap & alerts',
        protectsAgainst: 'Priority 4 · Impulse Robux & microtransactions',
        menuPath: ['Roblox Settings', 'Parental Controls', 'Monthly Spending Restrictions'],
        recommendedSetting:
          'Set Monthly Spend Limit to $0 (or agreed allowance) and turn ON Spending Notifications to your email.',
        whyItMatters:
          'Stops accidental one-tap purchases inside games built around flash sales and limited-edition skins.',
      },
      {
        id: 'rbx-time-limit',
        platformId: 'roblox',
        goalId: 'time_limits',
        title: 'Add a built-in Roblox daily Screen Time cap',
        protectsAgainst: 'Priority 5 · Multi-hour Roblox marathons',
        menuPath: ['Roblox Settings', 'Parental Controls', 'Screen Time', 'Daily Limit'],
        recommendedSetting: `Set a dedicated Roblox cap (e.g., 45–60 min on weekdays, within ${dailyCap}) so the account pauses across every device.`,
        whyItMatters:
          'Follows the Roblox account even if your child switches from an iPad to a laptop or console.',
      },
    ],
    youtube: [
      {
        id: 'yt-adult-supervised',
        platformId: 'youtube',
        goalId: 'adult_content',
        title: 'Switch to YouTube Kids or a Supervised Experience',
        protectsAgainst: 'Priority 1 · Explicit videos & shock rabbit holes',
        menuPath: ['Family Link App', 'Controls', 'Content Restrictions', 'YouTube'],
        recommendedSetting:
          age <= 8
            ? 'Use YouTube Kids set to "Approved Content Only" or "Younger (5–8)" and turn Search OFF.'
            : age <= 12
              ? 'Choose Supervised Experience → "Explore (9+)" and turn Autoplay OFF.'
              : 'Choose Supervised Experience → "Explore More (13+)" and enable Restricted Mode.',
        whyItMatters:
          'Standard YouTube recommendations escalate rapidly toward shock content. Supervised tiers filter channels automatically.',
      },
      {
        id: 'yt-strangers-comments',
        platformId: 'youtube',
        goalId: 'strangers_dms',
        title: 'Disable public uploads, live chat & comment threads',
        protectsAgainst: 'Priority 2 · Stranger comments & livestream chat',
        menuPath: ['YouTube Family Center', 'Supervised Account Settings'],
        recommendedSetting:
          'Keep Supervised Mode active (automatically blocks live chat, commenting, and public video uploads for under-13 accounts).',
        whyItMatters:
          'Prevents strangers from contacting your child in livestream chats or leaving abusive replies.',
      },
      {
        id: 'yt-time-limit',
        platformId: 'youtube',
        goalId: 'time_limits',
        title: 'Set YouTube Shorts feed limit (down to 0 min) & Autoplay OFF',
        protectsAgainst: 'Priority 3 · Endless Shorts & Autoplay loops',
        menuPath: ['Family Link / YouTube Family Center', 'Time Management', 'Shorts Feed Limit'],
        recommendedSetting:
          age <= 12
            ? 'Set Shorts Feed Limit to 0 minutes (blocks endless Shorts while keeping regular videos), toggle Autoplay OFF, and enforce a daily OS cap.'
            : 'Cap Shorts Feed Limit to 15–30 minutes/day, toggle Autoplay OFF, and keep a 20-minute Break Reminder on.',
        whyItMatters:
          'Google’s Shorts timer cuts off the highest-dopamine endless-scroll mechanic without banning helpful long-form videos.',
      },
      {
        id: 'yt-bedtime',
        platformId: 'youtube',
        goalId: 'bedtime_downtime',
        title: `Turn on ${curfew.time12} Bedtime Reminder + OS Downtime`,
        protectsAgainst: 'Priority 4 · Late-night video watching in bed',
        menuPath: ['YouTube Settings', 'General', 'Remind Me When It’s Bedtime'],
        recommendedSetting: `Enable Bedtime Reminder at ${curfew.time12} and block YouTube under Apple Downtime or Family Link Downtime.`,
        whyItMatters:
          'Stops “just one more video” from turning into midnight screen use on school nights.',
      },
    ],
    home_dns: [
      {
        id: 'dns-adult-filter',
        platformId: 'home_dns',
        goalId: 'adult_content',
        title: 'Turn on Family-Safe DNS (Cloudflare 1.1.1.3 or NextDNS)',
        protectsAgainst: 'Priority 1 · Explicit sites & malware on consoles, TVs & PCs',
        menuPath: [
          'Home Router Admin (or Device Wi-Fi Settings)',
          'DNS Servers',
          'Primary: 1.1.1.3 · Secondary: 1.0.0.3',
        ],
        recommendedSetting:
          'Set Primary DNS to 1.1.1.3 (Cloudflare for Families, free, blocks malware & adult domains) or set up a free NextDNS profile.',
        whyItMatters:
          'Covers Nintendo Switch, PlayStation, Xbox, smart TVs, and laptops where Apple Screen Time and Google Family Link cannot run.',
      },
      {
        id: 'dns-app-blocking',
        platformId: 'home_dns',
        goalId: 'app_approvals',
        title: 'Block specific social platforms & VPN workarounds via NextDNS',
        protectsAgainst: 'Priority 2 · TikTok, Discord web & proxy bypasses',
        menuPath: ['NextDNS Dashboard', 'Parental Control', 'Websites, Apps & Games'],
        recommendedSetting:
          age <= 12
            ? 'Block TikTok, Snapchat, Instagram, Discord, and turn ON "Block Bypass Methods" (VPNs & proxies).'
            : 'Block high-risk anonymous sites, and enforce SafeSearch & YouTube Restricted Mode at the network layer.',
        whyItMatters:
          'Closes the classic loophole where kids open social media in a web browser after the app itself is blocked.',
      },
      {
        id: 'dns-bedtime-schedule',
        platformId: 'home_dns',
        goalId: 'bedtime_downtime',
        title: `Pause recreational internet at ${curfew.time12} via Router / NextDNS`,
        protectsAgainst: 'Priority 3 · Consoles & spare tablets after bedtime',
        menuPath: [
          'NextDNS (or Router App: Eero / Google WiFi / Deco)',
          'Parental Control',
          'Recreation Time Schedule',
        ],
        recommendedSetting: `Pause gaming consoles, smart TVs, and kid devices at ${curfew.time12} nightly so spare screens cannot bypass phone downtime.`,
        whyItMatters:
          'Catches the workaround where a child docks their phone at bedtime and hops onto a console or spare tablet.',
      },
    ],
  };

  const goalSet = new Set(selectedGoals);
  const allForPlatform = catalogByPlatform[platformId] ?? [];
  return allForPlatform.filter((step) => goalSet.has(step.goalId));
}

export interface AgeUpgradeStage {
  ageRange: string;
  label: string;
  keepLocked: string;
  graduallyOpen: string;
}

export const AGE_GUARDRAIL_LADDER: AgeUpgradeStage[] = [
  {
    ageRange: 'Ages 4–9',
    label: 'Strict Guardrails',
    keepLocked: 'No personal smartphone, Allowed Websites Only, Ask to Buy ON, zero stranger chat, Shorts 0m.',
    graduallyOpen: 'Shared family tablet or console with 45–60 min OS cap and 8:00 PM downtime.',
  },
  {
    ageRange: 'Ages 10–12',
    label: 'Starter Phone or Bridge',
    keepLocked: 'Tamper lock & adult filter ON, Ask to Buy ON, Contacts Only, Roblox DMs OFF, 8:30 PM downtime.',
    graduallyOpen: 'Smartwatch or starter phone with parent-approved contacts and 1.5 hr OS cap.',
  },
  {
    ageRange: 'Ages 13–15',
    label: 'Guided Independence',
    keepLocked: 'Adult filter & explicit-media blur ON, 9:30 PM bedtime downtime, Ask to Buy for new apps.',
    graduallyOpen: 'Messaging with known friends and carefully reviewed apps once habits hold steady.',
  },
  {
    ageRange: 'Ages 16–18',
    label: 'Launch Ready',
    keepLocked: 'Driving Focus locked ON, Safe DNS at home, honest check-ins around sleep and focus.',
    graduallyOpen: 'Gradually hand over daily time management before college or independent living.',
  },
];
