---
description: An inspired design-system interpretation of Fly.io --- a
  developer-first infrastructure platform whose visual language should
  communicate speed, control, technical depth, and confidence through
  bold typography, dark technical surfaces, and precise interface
  components.
name: Flyio-design-analysis
version: alpha
---

# Fly.io --- Design System

> **Scope and confidence:** Based on the current Fly.io homepage and
> public product descriptions for Machines, Sprites, storage,
> deployment, regions, and agent tooling. The precise color/font tokens
> are not documented in the reviewed page text; the values below are an
> implementation interpretation. Check current logo assets, screenshots,
> and product UI before treating the values as exact.

## Overview

Fly.io speaks to developers who want to deploy applications, run
isolated compute, and operate infrastructure without unnecessary
complexity. The current homepage emphasizes Fly Machines,
hardware-isolated sandboxes called Sprites, storage, framework support,
global regions, and agent-driven deployment and debugging.

The design should feel **technical, fast, independent, and
developer-native**. It should have more personality than a generic cloud
provider, but still present infrastructure details with precision. Use
bold marketing composition and product-led diagrams, then switch to
compact, information-dense interface patterns where the user needs to
configure or monitor infrastructure.

**Key characteristics** - Developer-first voice with direct, concise
headlines. - Product concepts explained through architecture, deployment
flows, and technical diagrams. - High-contrast hero and product
sections; code and CLI references are part of the visual language. -
Strong hierarchy for performance claims and infrastructure
capabilities. - Documentation and product UI should prioritize clarity,
navigation, and precise technical language.

## Colors

### Suggested palette

A proposed dark developer-tool palette with a warm bright accent. These
values are not verified official Fly.io tokens.

  Token                       Value       Purpose
  --------------------------- ----------- -----------------------------
  `{colors.primary}`          `#F28A4B`   Warm orange action accent
  `{colors.on-primary}`       `#17191F`   Text on accent
  `{colors.ink}`              `#F4F5F7`   Main text on dark
  `{colors.body}`             `#B7BBC5`   Secondary text on dark
  `{colors.mute}`             `#858B98`   Metadata
  `{colors.canvas}`           `#17191F`   Main dark canvas
  `{colors.canvas-soft}`      `#222630`   Secondary dark surface
  `{colors.surface}`          `#FFFFFF`   Light content surface
  `{colors.surface-soft}`     `#F5F6F8`   Light panel
  `{colors.hairline}`         `#343A46`   Dark divider
  `{colors.hairline-light}`   `#E2E5EA`   Light divider
  `{colors.success}`          `#35A879`   Healthy deployment / status
  `{colors.warning}`          `#E4A84C`   Warning
  `{colors.danger}`           `#E16B6B`   Error / failed deployment
  `{colors.info}`             `#72A8E8`   Informational state

### Usage rules

-   Use the dark canvas for hero and technical storytelling; do not
    force every product surface into dark mode.
-   Use orange as a focused action accent, not as a background for large
    content areas.
-   Use light surfaces where dense configuration or documentation
    benefits from extended reading.
-   Technical status colors must be consistent across deploy, machine,
    and monitoring views.
-   Diagrams should use a limited palette with clear labels and
    directional flow.

## Typography

### Font direction

Use a crisp sans-serif for display and body, paired with a monospace
face for code and infrastructure identifiers. **Inter** is a safe
implementation default; the exact live typeface should be verified.

``` yaml
fontFamily:
  display: Inter, system-ui, -apple-system, sans-serif
  body: Inter, system-ui, -apple-system, sans-serif
  code: ui-monospace, SFMono-Regular, Menlo, monospace
```

### Hierarchy

  Token                         Size   Weight   Line height Use
  --------------------------- ------ -------- ------------- -----------------------
  `{typography.display-xl}`     68px      650           1.0 Hero headline
  `{typography.display-lg}`     48px      650          1.08 Section headline
  `{typography.display-md}`     32px      600           1.2 Product title
  `{typography.heading-sm}`     20px      600           1.3 Feature / panel title
  `{typography.body-lg}`        18px      400          1.55 Lead paragraph
  `{typography.body-md}`        15px      400           1.5 Main UI
  `{typography.body-sm}`        13px      400          1.45 Secondary UI
  `{typography.label}`          12px      600           1.3 Labels / metadata
  `{typography.code}`           13px      400          1.55 CLI and code blocks
  `{typography.metric}`         36px      650           1.0 Performance numbers

### Principles

-   Hero headlines should be bold and direct, with tight tracking.
-   Use monospace only where it adds technical meaning: commands, IDs,
    code, logs, and configuration.
-   Performance numbers should be large, but always paired with context
    and units.
-   Avoid long all-caps labels; use them sparingly for small technical
    eyebrows.

## Layout

### Spacing system

Use an 8px base rhythm with compact 4px increments.

  Token               Value
  ----------------- -------
  `{spacing.xs}`        4px
  `{spacing.sm}`        8px
  `{spacing.md}`       12px
  `{spacing.lg}`       16px
  `{spacing.xl}`       24px
  `{spacing.2xl}`      32px
  `{spacing.3xl}`      48px
  `{spacing.4xl}`      64px
  `{spacing.5xl}`      96px

-   Marketing container: approximately 1200--1280px.
-   Hero can use a wide text block with a product/architecture visual
    alongside or below.
-   Feature sections should alternate between concise explanation and a
    technical visual.
-   Product console: sidebar + main content + contextual details panel.
-   Documentation: narrow reading column, persistent navigation, and
    code blocks aligned to the text.

### Responsive strategy

  ------------------------------------------------------------------------
  Breakpoint                                   Width Behavior
  --------------------- ---------------------------- ---------------------
  Mobile                                    \< 640px Single-column hero;
                                                     diagrams simplify;
                                                     nav collapses

  Tablet                                 640--1023px Two-column feature
                                                     sections where space
                                                     permits

  Desktop                                   ≥ 1024px Full product diagrams
                                                     and multi-column
                                                     content

  Wide                                      ≥ 1440px Wider architecture
                                                     visuals and
                                                     documentation layout
  ------------------------------------------------------------------------

Do not shrink complex infrastructure diagrams until labels become
unreadable; simplify or provide horizontal scroll.

## Elevation & Depth

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        Dark or light canvas    Main content

  Level 1 --- Hairline    1px border              Cards, code panels,
                                                  settings groups

  Level 2 --- Raised      Subtle shadow + border  Menus, command
                                                  palettes, floating
                                                  panels

  Level 3 --- Overlay     Strong shadow +         Dialogs, deployment
                          backdrop                confirmation
  -----------------------------------------------------------------------

Use restrained depth. Technical panels should feel engineered, not like
decorative floating tiles.

## Shapes

  Token                 Value Use
  ------------------ -------- ----------------------------------
  `{rounded.xs}`          4px Code blocks and compact controls
  `{rounded.sm}`          6px Buttons and inputs
  `{rounded.md}`         10px Standard panels
  `{rounded.lg}`         14px Feature cards
  `{rounded.pill}`     9999px Status badges only

Keep terminal and code surfaces more squared than marketing feature
cards.

## Components

### Navigation

-   **`marketing-nav`** --- logo, Products, Features, Customers,
    Pricing, Community, and account actions.
-   **`console-sidebar`** --- organization, apps, Machines, storage,
    databases, networking, and monitoring.
-   **`docs-sidebar`** --- structured navigation tree with active
    section and search.
-   **`breadcrumbs`** --- app / machine / region hierarchy.

### Buttons

-   **`button-primary`** --- accent fill for deploy, launch, and create
    actions.
-   **`button-secondary`** --- dark or light outlined action.
-   **`button-ghost`** --- tertiary action in navigation and tables.
-   **`button-danger`** --- reserved for destructive infrastructure
    actions, always paired with confirmation.

### Technical surfaces

-   **`code-panel`** --- monospace command, copy action, optional syntax
    highlighting.
-   **`machine-card`** --- machine name, region, state, CPU / memory,
    and actions.
-   **`deployment-status`** --- current state, progress, commit/build
    context, and logs link.
-   **`region-selector`** --- searchable region list with latency or
    locality context where available.
-   **`architecture-diagram`** --- nodes, connections, labels, and clear
    directionality.
-   **`metric-card`** --- one performance or reliability metric with
    unit and explanatory label.
-   **`log-viewer`** --- monospace lines, timestamps, severity, and
    filtering.
-   **`resource-table`** --- aligned CPU, memory, storage, region, and
    state columns.

### Inputs & controls

-   **`command-input`** --- monospace input for CLI-like commands.
-   **`search-input`** --- global resource and documentation search.
-   **`region-dropdown`** --- clear current region and supported
    alternatives.
-   **`segmented-control`** --- switches between overview, metrics,
    logs, and settings.
-   **`status-badge`** --- small, text-labeled state indicator.

### Signature patterns

-   **Deploy flow:** connect repository / CLI → configure app → deploy →
    inspect health and logs.
-   **Machine detail:** state and region at top, resource metrics,
    recent deployments, and logs.
-   **Agent workflow:** show what the agent can do, which permissions it
    has, and the actions it performed.
-   **Sandbox / Sprite preview:** environment status, resource use,
    checkpoint / restore actions, and isolated execution context.

## Do's and Don'ts

### Do

-   Use code and architecture visuals as meaningful product proof.
-   Make deployment state and machine health immediately understandable.
-   Show units with all performance metrics.
-   Keep destructive actions visually distinct and confirm them.
-   Make docs and CLI examples easy to copy.

### Don't

-   Don't use decorative terminal windows without real product context.
-   Don't make every card dark if it harms readability.
-   Don't bury logs, region, or resource state.
-   Don't use color alone for deployment status.
-   Don't overstate speed or uptime without clear units and context.

## Source notes

-   Official website: https://fly.io/
-   Public product areas: Machines, Sprites, Managed Postgres, private
    networking, autoscaling, zero-downtime deploys, monitoring, CLI and
    MCP tooling.
-   Current homepage describes Fly.io as a platform for developers and
    agents to deploy apps and isolated compute.
