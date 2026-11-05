---
description: A design-system interpretation of Subframe's visual
  language --- a minimal, engineering-forward design-to-code product
  identity built around a near-monochrome light canvas, precise Inter
  typography, oversized tightly tracked headlines, soft neutral
  surfaces, rounded rectangular components, and a restrained dark
  product-preview motif.
name: Subframe-design-analysis
version: alpha
---

# Subframe --- Design System

> **Scope and confidence:** This document describes the publicly visible
> Subframe marketing website and its design language. It is an
> implementation-ready interpretation, not an official Subframe
> brand-guidelines document. Exact measurements not published by
> Subframe are practical approximations based on the visible site and
> independent design captures. The interactive desktop application may
> use additional patterns not represented here.

## Overview

Subframe presents itself as a design-and-build environment for people
who create software. Its public website communicates that positioning
through a restrained, engineering-forward visual system: a light neutral
canvas, high-contrast black typography, quiet gray supporting text,
generous whitespace, rounded content surfaces, and dark product imagery
that gives the page a clear focal point.

The visual identity is intentionally low-chroma. Rather than relying on
a bright brand color, it uses scale, typography, contrast, product
screenshots, and layout rhythm to create recognition. The result feels
contemporary and technical without looking like a conventional
developer-tool dashboard.

The site's content reinforces the visual approach. Product capabilities
are explained through a sequence of concise sections and interface
imagery: design canvas, built-in browser, coding agent, collaboration,
and the design-to-build workflow. The product itself is the main visual
asset.

### Key characteristics

-   **Near-monochrome palette:** black and charcoal text, white and
    pale-gray surfaces, muted gray secondary text, and restrained
    cool-blue focus treatment.
-   **Light editorial canvas:** a very light gray or off-white
    background carries most marketing content.
-   **Strong typographic hierarchy:** large, tightly tracked sans-serif
    headlines contrast with quieter supporting copy.
-   **Inter-led typography:** Inter is a reliable primary interface and
    body face; display typography may vary by page or current site
    implementation.
-   **Soft geometry:** rounded rectangular buttons and cards, with
    larger radii reserved for prominent preview surfaces.
-   **Flat surfaces:** hierarchy comes from spacing, contrast, and
    subtle borders rather than heavy drop shadows.
-   **Product-led imagery:** screenshots, canvas previews, and dark
    interface mockups demonstrate the actual product.
-   **Restrained motion:** interactions should feel direct and useful,
    not decorative.

## Colors

The palette below is a practical token set for recreating the public
marketing-site direction. The core neutrals are supported by independent
captures of Subframe's website; semantic and state colors are proposed
implementation tokens rather than claims about official brand
specifications.

### Core palette

  -----------------------------------------------------------------------
  Token                   Hex                     Intended use
  ----------------------- ----------------------- -----------------------
  `canvas`                `#FAFAFA`               Main page background

  `surface`               `#FFFFFF`               Primary cards, dialogs,
                                                  and clean content
                                                  surfaces

  `surface-soft`          `#F5F5F5`               Secondary cards, hover
                                                  surfaces, and grouped
                                                  content

  `surface-muted`         `#EDEDED`               Preview backgrounds and
                                                  subtle section contrast

  `ink`                   `#171717`               Main headings, body
                                                  text, icons, and
                                                  primary labels

  `ink-soft`              `#242424`               Primary action
                                                  backgrounds and dark
                                                  interface surfaces

  `body`                  `#5C5C5C`               Paragraphs and
                                                  supporting descriptions

  `muted-strong`          `#737373`               Secondary labels and
                                                  navigation

  `muted`                 `#A3A3A3`               Tertiary text, helper
                                                  text, and inactive
                                                  items

  `hairline`              `#E5E5E5`               Card borders,
                                                  separators, and input
                                                  outlines

  `hairline-strong`       `#D4D4D4`               Stronger dividers and
                                                  selected boundaries

  `on-dark`               `#FFFFFF`               Text and icons on dark
                                                  surfaces

  `focus`                 `#3E63DD`               Keyboard focus ring and
                                                  accessible focus
                                                  indication
  -----------------------------------------------------------------------

### Color usage principles

-   Keep the main marketing canvas light and neutral.
-   Use `ink` for headings and important content; do not use pure black
    for every secondary element.
-   Use `body` and `muted-strong` to establish hierarchy without
    reducing readability.
-   Use `surface-soft` to group related content; avoid turning every
    section into a card.
-   Reserve `ink-soft` for primary calls to action, dark product
    previews, and deliberate contrast moments.
-   Use `focus` for visible keyboard focus, not as a decorative brand
    accent.
-   Do not introduce multiple saturated accent colors without a
    product-specific reason.

### Suggested semantic colors

These are practical product-interface additions, not colors verified as
part of Subframe's marketing palette.

  Token       Hex         Use
  ----------- ----------- -------------------------------------------
  `success`   `#16856B`   Successful actions and positive status
  `warning`   `#B7791F`   Caution and pending states
  `danger`    `#C24141`   Errors and destructive actions
  `info`      `#3E63DD`   Informational states and focus-related UI

## Typography

### Font families

1.  **Inter** --- primary typeface for navigation, headings, body copy,
    labels, and buttons. Use a variable font where available.
2.  **System UI fallback** --- `-apple-system`, `BlinkMacSystemFont`,
    `Segoe UI`, and sans-serif for robust rendering.
3.  **Monospace** --- `ui-monospace`, `SFMono-Regular`, `Menlo`,
    `Consolas`, monospace for code snippets, command examples, and
    technical metadata.

Subframe's public website is commonly captured with Inter. Some
independent captures identify a display face such as PP Neue Montreal;
because the exact font can vary by page or implementation, use Inter as
the dependable default and treat any alternate display face as optional.

### Type scale

The following scale is an implementation recommendation, not a claim
that these exact values are published by Subframe.

  -------------------------------------------------------------------------------
  Token                  Size       Weight  Line height     Tracking Use
  -------------- ------------ ------------ ------------ ------------ ------------
  `display-xl`           88px     600--700         0.98     -0.055em Hero
                                                                     headline on
                                                                     wide screens

  `display-lg`           64px     600--700         1.00      -0.05em Major
                                                                     section
                                                                     headline

  `display-md`           48px     600--700         1.05      -0.04em Secondary
                                                                     display

  `heading-xl`           32px          600         1.15      -0.03em Section
                                                                     heading

  `heading-lg`           24px          600         1.25      -0.02em Card and
                                                                     feature
                                                                     heading

  `heading-md`           20px          600         1.30     -0.015em Subsection
                                                                     heading

  `body-lg`              18px          400         1.60            0 Lead
                                                                     paragraphs

  `body-md`              16px          400         1.55            0 Default body

  `body-sm`              14px     400--500         1.45            0 Supporting
                                                                     copy and
                                                                     navigation

  `label`                12px          500         1.35       0.01em Eyebrows,
                                                                     metadata,
                                                                     and compact
                                                                     labels

  `code`                 13px          400         1.55            0 Code and
                                                                     command
                                                                     snippets
  -------------------------------------------------------------------------------

### Typography principles

-   Use large display type sparingly; the hero should have one clear
    message.
-   Tighten tracking on large headings, but keep paragraph tracking
    neutral.
-   Prefer medium or semibold weights over heavy bold for most headings.
-   Keep body copy comfortably readable; muted text should still meet
    contrast requirements.
-   Use monospace only where it communicates code or technical detail.
-   Avoid using several unrelated typefaces.

## Layout

### Spacing system

Use a consistent 4px base scale. Values below are recommended design
tokens.

  Token          Value
  ------------ -------
  `space-1`        4px
  `space-2`        8px
  `space-3`       12px
  `space-4`       16px
  `space-5`       20px
  `space-6`       24px
  `space-8`       32px
  `space-10`      40px
  `space-12`      48px
  `space-16`      64px
  `space-20`      80px
  `space-24`      96px

### Container and grid

-   **Maximum content width:** approximately 1200--1280px.
-   **Reading width:** approximately 640--760px for long-form copy.
-   **Desktop page gutters:** 32--48px.
-   **Tablet gutters:** 24--32px.
-   **Mobile gutters:** 20--24px.
-   Use a 12-column grid on desktop when a multi-column composition is
    needed.
-   Keep text blocks narrower than product screenshots.
-   Align section headings, descriptions, and product visuals to a
    consistent container edge.

### Section rhythm

-   Use generous vertical spacing between major marketing sections.
-   Keep related heading, paragraph, and CTA groups visually connected.
-   Alternate full-width content with constrained text and
    product-preview regions.
-   Avoid adding background panels to every section.
-   Let screenshots and product previews provide visual variation.

## Responsive strategy

Recommended breakpoints:

  ------------------------------------------------------------------------
  Name                                         Width Guidance
  --------------------- ---------------------------- ---------------------
  Mobile                                   `< 640px` Single-column
                                                     content; compact
                                                     navigation; stack
                                                     CTAs

  Tablet                                `640–1023px` Two-column layouts
                                                     only where content
                                                     remains readable

  Desktop                                 `≥ 1024px` Full navigation;
                                                     wider product-preview
                                                     compositions

  Wide                                    `≥ 1440px` Increase outer
                                                     whitespace, not body
                                                     text width
  ------------------------------------------------------------------------

### Responsive behavior

-   Reduce hero display size fluidly with `clamp()`.
-   Stack multi-column feature sections on narrow screens.
-   Keep product screenshots legible; crop only when the key interaction
    remains understandable.
-   Convert dense navigation to a menu on mobile.
-   Make all interactive targets at least 44×44px on touch devices.
-   Avoid horizontal scrolling except inside intentionally scrollable
    product previews.

## Elevation, borders, and shapes

### Elevation

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        No shadow or border     Main canvas and large
                                                  editorial sections

  Level 1 --- Hairline    1px solid `hairline`    Cards, inputs, and
                                                  grouped surfaces

  Level 2 --- Soft lift   Very subtle shadow,     Popovers, menus, and
                          used sparingly          dialogs

  Level 3 --- Overlay     Clear shadow plus       Modal dialogs and
                          backdrop                floating panels
  -----------------------------------------------------------------------

The visual language is primarily flat. Use borders and surface contrast
before adding shadows.

### Radius scale

  Token              Value Use
  --------------- -------- ---------------------------------------
  `radius-xs`          4px Small controls and compact labels
  `radius-sm`          8px Inputs and small buttons
  `radius-md`         12px Standard buttons and small cards
  `radius-lg`         16px Feature cards and media frames
  `radius-xl`         24px Large product-preview surfaces
  `radius-2xl`        32px Exceptional hero or showcase surfaces
  `radius-pill`     9999px Pills and circular controls only

Use rounded rectangles rather than making every component pill-shaped.
Keep radii consistent within component families.

## Components

### Navigation

**`nav-bar`** - Transparent or canvas-colored background. - Minimal logo
area on the left. - Small, medium-weight navigation labels. - Primary
action on the right. - No heavy shadow; use a subtle bottom border only
if needed. - Mobile navigation should preserve the primary action.

**`nav-link`** - Text color: `muted-strong`. - Active color: `ink`. -
Hover: transition to `ink` or a very subtle `surface-soft` background. -
Provide a clear keyboard focus state.

### Buttons

**`button-primary`** - Background: `ink-soft` (`#242424`). - Text:
`on-dark` (`#FFFFFF`). - Font: Inter, 14px, weight 500--600. - Radius:
`radius-md`. - Padding: 10--12px vertical, 16--20px horizontal. - Hover:
slightly lighter dark surface. - Focus: 2px visible focus ring with
offset. - Disabled: reduced contrast and disabled cursor/state.

**`button-secondary`** - Background: `surface-soft`. - Text: `ink`. -
Border: optional 1px `hairline`. - Same height and radius as primary. -
Hover: slightly darker neutral surface.

**`button-ghost`** - Transparent background. - Text: `ink` or
`muted-strong`. - Use for low-emphasis actions and navigation.

**`button-icon`** - Square hit area, minimum 40px; 44px on touch. -
Subtle hover surface. - Include an accessible name for icon-only
controls.

### Cards and content surfaces

**`card`** - Background: `surface`. - Border: 1px solid `hairline`. -
Radius: `radius-lg` or `radius-xl`. - Padding: 24--32px. - No default
shadow. - Use only when grouping information improves comprehension.

**`feature-card`** - Use a concise heading and short description. - Pair
with a meaningful product screenshot, diagram, or icon. - Keep card
heights consistent only when the layout benefits from it.

**`product-preview-card`** - Background: `surface-soft` or
`surface-muted`. - Radius: `radius-xl`. - Clip product imagery to the
card boundary. - Prefer real product UI over decorative illustrations. -
Preserve enough detail for the preview to communicate a real capability.

### Inputs and forms

**`text-input`** - Background: `surface`. - Text: `ink`. - Placeholder:
`muted`. - Border: 1px solid `hairline-strong`. - Radius: `radius-sm`. -
Height: 44--48px. - Focus: 2px `focus` ring with clear offset. - Error
and helper messages should be explicit and associated with the field.

**`select`** - Match input height, border, radius, and focus behavior. -
Keep menu item spacing comfortable. - Make selected and hover states
distinguishable without relying on color alone.

### Badges and pills

-   Use small pills for categories, status, or compact metadata.
-   Keep text legible and avoid excessive use.
-   Prefer neutral surfaces for ordinary labels.
-   Reserve semantic colors for meaningful states.

### Dialogs and popovers

-   White surface, subtle border, and restrained shadow.
-   Clear title and description hierarchy.
-   Obvious close and dismissal behavior.
-   Keep destructive actions visually distinct.
-   Maintain keyboard focus within modal dialogs.

### Product imagery and media

-   Use authentic screenshots or carefully prepared product mockups.
-   Place screenshots inside neutral preview frames.
-   Keep image corners aligned with their container radius.
-   Avoid generic stock illustrations when the product interface can
    demonstrate the feature.
-   Use dark product imagery as a deliberate contrast element against
    the light marketing canvas.

## Motion and interaction

Motion should communicate state and preserve a sense of responsiveness.

Recommended behavior: - Use short transitions for hover, focus, and
pressed states (roughly 120--200ms). - Use slightly longer transitions
for menus and dialogs (roughly 180--260ms). - Prefer opacity and small
transform changes over large movement. - Avoid scroll-jacking,
unnecessary parallax, and decorative animation loops. - Respect
`prefers-reduced-motion`. - Provide visible hover, focus, active,
disabled, loading, and error states.

## Accessibility

-   Meet WCAG AA contrast for text and interactive controls.
-   Never communicate status through color alone.
-   Preserve visible keyboard focus.
-   Use semantic HTML and correct heading order.
-   Provide labels for all form fields.
-   Give meaningful alternative text to informative images; use empty
    alt text for purely decorative images.
-   Ensure touch targets are comfortably sized.
-   Test layouts at narrow widths and browser zoom.

## Design tokens --- CSS example

``` css
:root {
  /* Color */
  --color-canvas: #fafafa;
  --color-surface: #ffffff;
  --color-surface-soft: #f5f5f5;
  --color-surface-muted: #ededed;
  --color-ink: #171717;
  --color-ink-soft: #242424;
  --color-body: #5c5c5c;
  --color-muted-strong: #737373;
  --color-muted: #a3a3a3;
  --color-border: #e5e5e5;
  --color-border-strong: #d4d4d4;
  --color-focus: #3e63dd;

  /* Typography */
  --font-sans: Inter, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo,
    Consolas, monospace;

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-pill: 9999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Borders and focus */
  --border-width: 1px;
  --focus-width: 2px;
  --focus-offset: 2px;

  /* Motion */
  --duration-fast: 120ms;
  --duration-normal: 180ms;
  --duration-slow: 260ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

## Do's and Don'ts

### Do

-   Keep the interface predominantly neutral.
-   Use strong typography and whitespace to create hierarchy.
-   Make the product itself the primary visual proof.
-   Use subtle borders and surface contrast for grouping.
-   Keep buttons and controls consistent.
-   Use real interface previews rather than generic decorative artwork.
-   Design responsive behavior as part of each component.
-   Preserve accessible contrast and keyboard focus.

### Don't

-   Don't introduce a bright accent color just to make the page feel
    more colorful.
-   Don't use gradients as a substitute for visual hierarchy.
-   Don't put every section inside a rounded card.
-   Don't use heavy shadows on ordinary content surfaces.
-   Don't overuse pill buttons or oversized radii.
-   Don't make secondary text so pale that it becomes difficult to read.
-   Don't use decorative motion that distracts from the product.
-   Don't imitate Subframe's logo or claim this is its official design
    system.

## Source notes

This interpretation is based on: - Subframe's public website and its
description of the product as a design canvas, built-in browser, and
coding agent. - Public Subframe pages describing its design-system and
React-component workflow. - Independent visual captures and design
analyses of the Subframe marketing site.

The exact type scale, spacing values, radius scale, semantic colors, and
component measurements in this document are proposed practical tokens.
They should be validated against the current live site and adapted to
the product being designed.
