---
description: An inspired design-system interpretation of Pirsch
  Analytics --- a privacy-first web analytics product with a crisp,
  data-led interface, approachable developer tooling, and restrained
  visual emphasis.
name: Pirsch-design-analysis
version: alpha
---

# Pirsch --- Design System

> **Scope and confidence:** Based on Pirsch's public marketing pages,
> documentation, and descriptions of its analytics dashboard. The exact
> CSS tokens and font declarations are not published in the reviewed
> material. Palette values, type metrics, spacing, and component
> geometry are implementation approximations; validate against the live
> dashboard and logo assets before treating them as exact.

## Overview

Pirsch positions itself as a privacy-friendly, cookie-free alternative
to conventional web analytics. Its product story combines
straightforward setup, actionable traffic insights, custom events,
campaign tracking, integrations, and data protection. The interface
should communicate **clarity, trust, speed, and technical credibility**.

The visual system should make analytics feel approachable rather than
intimidating. Use a clean light canvas, high-contrast text, compact
controls, and clear data visualization. Privacy is a core product
principle, so the design should feel transparent and calm rather than
surveillance-oriented.

**Key characteristics** - Clear, benefit-led marketing structure: setup,
insights, advanced analytics, privacy, integrations. - Dashboard-first
storytelling with charts, filters, traffic breakdowns, and concise
metrics. - Developer credibility through documentation, SDKs,
integrations, and open-source references. - European privacy positioning
should be expressed through trust cues and clear explanations, not
excessive compliance badges. - Dense data views must remain calm and
easy to scan.

## Colors

### Suggested palette

These are practical approximations for a neutral analytics interface.
Keep the brand accent aligned with the current Pirsch logo and live UI
if it differs.

  Token                       Value       Purpose
  --------------------------- ----------- ------------------------------------
  `{colors.primary}`          `#3D6FE8`   Primary interactive accent
  `{colors.on-primary}`       `#FFFFFF`   Text on primary
  `{colors.ink}`              `#20242C`   Main text
  `{colors.body}`             `#596170`   Paragraphs and secondary text
  `{colors.mute}`             `#87909E`   Metadata and captions
  `{colors.canvas}`           `#FFFFFF`   Main background
  `{colors.surface}`          `#F8F9FB`   Cards and grouped panels
  `{colors.surface-strong}`   `#F0F2F6`   Selected / hover surfaces
  `{colors.hairline}`         `#E4E7ED`   Borders and separators
  `{colors.success}`          `#23865B`   Positive change / successful state
  `{colors.warning}`          `#C58A2A`   Attention state
  `{colors.danger}`           `#C84D55`   Errors / negative change
  `{colors.info}`             `#3D6FE8`   Informational state

### Usage rules

-   Use the primary accent for links, selected filters, focus, and the
    most important action.
-   Keep large surfaces white or near-white to maximize chart contrast.
-   Use semantic colors sparingly and consistently.
-   Avoid decorative gradients behind charts or dashboard cards.
-   Always pair trend arrows and colors with numeric values or labels.

## Typography

### Font direction

A neutral UI sans-serif is appropriate. Use **Inter** as a practical
default, with system fallbacks. Use a monospace face only for code, API
examples, and technical identifiers. Exact production font usage is not
confirmed.

``` yaml
fontFamily:
  display: Inter, system-ui, -apple-system, sans-serif
  body: Inter, system-ui, -apple-system, sans-serif
  code: ui-monospace, SFMono-Regular, Menlo, monospace
```

### Hierarchy

  Token                         Size   Weight   Line height Use
  --------------------------- ------ -------- ------------- -------------------------
  `{typography.display-xl}`     56px      650          1.05 Hero headline
  `{typography.display-lg}`     42px      650          1.12 Section headline
  `{typography.display-md}`     30px      600           1.2 Dashboard page title
  `{typography.heading-sm}`     18px      600          1.35 Card / chart title
  `{typography.body-lg}`        17px      400          1.55 Lead copy
  `{typography.body-md}`        14px      400           1.5 Main interface
  `{typography.body-sm}`        12px      400          1.45 Metadata
  `{typography.label}`          12px      600           1.3 Filter and field labels
  `{typography.metric}`         30px      600           1.1 KPI values
  `{typography.code}`           13px      400           1.5 API / code snippets

### Principles

-   Use compact, highly legible typography in the dashboard.
-   Make KPI values visually distinct without oversized display styling.
-   Use tabular numerals for all analytics values.
-   Reserve monospace for code and technical tokens; do not use it for
    ordinary UI labels.

## Layout

### Spacing system

Use a 4px base scale, with 8px and 16px as the common rhythm.

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
  `{spacing.5xl}`      80px

-   Marketing container: approximately 1120--1200px.
-   Dashboard layout: compact top navigation or sidebar, central
    analytics canvas, optional filter / detail panel.
-   Use a consistent chart grid and align chart titles, legends, and
    controls.
-   Keep filters close to the data they affect.
-   Use whitespace to separate sections rather than oversized decorative
    cards.

### Responsive strategy

  ------------------------------------------------------------------------
  Breakpoint                                   Width Behavior
  --------------------- ---------------------------- ---------------------
  Mobile                                    \< 640px KPI cards stack;
                                                     charts become
                                                     single-column;
                                                     filters collapse

  Tablet                                 640--1023px Two-column KPI
                                                     layout; navigation
                                                     compact

  Desktop                                   ≥ 1024px Full dashboard grid
                                                     and side navigation

  Wide                                      ≥ 1440px Wider charts and
                                                     multi-panel analytics
  ------------------------------------------------------------------------

For narrow screens, prioritize the primary metric, trend, and top
traffic sources before secondary breakdowns.

## Elevation & Depth

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        White canvas            Main page

  Level 1 --- Hairline    1px neutral border      Cards, inputs, tables

  Level 2 --- Soft        Very subtle shadow      Menus, popovers,
                                                  floating filter panels

  Level 3 --- Overlay     Modal shadow + backdrop Dialogs and command
                                                  menus
  -----------------------------------------------------------------------

Prefer borders and background contrast over prominent shadows. Analytics
should feel precise, not ornamental.

## Shapes

  Token                 Value Use
  ------------------ -------- ------------------------------
  `{rounded.xs}`          4px Small controls
  `{rounded.sm}`          6px Inputs and buttons
  `{rounded.md}`         10px Chart cards
  `{rounded.lg}`         14px Feature panels
  `{rounded.pill}`     9999px Filter chips and status tags

Keep chart cards and controls consistent. Avoid excessive pill styling
for every element.

## Components

### Navigation

-   **`marketing-nav`** --- logo, Product, Solutions, Resources, and
    compact account actions.
-   **`dashboard-nav`** --- persistent navigation for overview, pages,
    sources, campaigns, events, goals, and settings.
-   **`breadcrumbs`** --- use for settings and deeper analytics
    configuration.

### Buttons

-   **`button-primary`** --- primary accent fill for trial / save /
    create actions.
-   **`button-secondary`** --- neutral outlined action for demo and
    secondary tasks.
-   **`button-ghost`** --- low-emphasis navigation and table actions.
-   **`button-icon`** --- compact icon button with tooltip and
    accessible label.

### Analytics surfaces

-   **`kpi-card`** --- metric, percentage change, comparison period, and
    optional sparkline.
-   **`traffic-chart`** --- time-series plot with readable axes,
    tooltip, and comparison toggle.
-   **`source-table`** --- referrer / UTM source rows with aligned
    counts and share values.
-   **`page-table`** --- page path, views, visitors, bounce / engagement
    metrics as supported.
-   **`event-list`** --- custom event name, count, and trend.
-   **`filter-bar`** --- date range, segment, device, country, and
    campaign filters.
-   **`chart-legend`** --- concise labels with stable series colors.
-   **`empty-state`** --- explains what data will appear and how to
    configure tracking.

### Inputs & controls

-   **`date-range-picker`** --- clear current range and quick presets.
-   **`search-input`** --- filters pages, sources, or events.
-   **`segmented-control`** --- switches between time windows or
    visualization modes.
-   **`filter-chip`** --- selected state uses a light accent tint.
-   **`toggle`** --- for optional comparisons and display settings.

### Signature patterns

-   **Analytics overview:** date range → KPI row → traffic chart → top
    pages and sources.
-   **One-click filtering:** filters remain visible and show active
    state clearly.
-   **Privacy explanation:** concise, structured sections that
    distinguish what is collected from what is not.
-   **Developer setup:** short install steps, code snippets, framework
    integrations, and a clear success state.

## Do's and Don'ts

### Do

-   Use consistent chart scales and clear legends.
-   Keep filters and date ranges discoverable.
-   Use tabular numerals for metrics.
-   Explain privacy behavior in plain language.
-   Make empty states actionable and setup-oriented.

### Don't

-   Don't overload the dashboard with too many chart colors.
-   Don't hide the selected date range or active filters.
-   Don't use color alone to indicate positive or negative performance.
-   Don't use dark, high-contrast panels for every chart.
-   Don't imply individual visitor surveillance; privacy is a defining
    product principle.

## Source notes

-   Official website: https://pirsch.io/
-   Privacy page: https://pirsch.io/privacy-friendly-analytics
-   Documentation: https://docs.pirsch.io/
-   Public product descriptions reference cookie-free analytics, traffic
    sources, UTM campaigns, custom events, goals, filters, integrations,
    and a visual dashboard.
