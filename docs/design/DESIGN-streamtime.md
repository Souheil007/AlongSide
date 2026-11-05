---
description: An inspired design-system interpretation of Streamtime ---
  a warm, optimistic project and business-management platform for
  creative teams, balancing clear operational dashboards with
  human-centered wellbeing cues.
name: Streamtime-design-analysis
version: alpha
---

# Streamtime --- Design System

> **Scope and confidence:** Based on the public Streamtime marketing
> site, feature descriptions, and the product screenshots described on
> the page. The public site establishes the product's information
> architecture and visual tone, but does not publish a formal
> design-token specification. Hex values, font sizes, radii, and
> breakpoints below are practical approximations for recreating the
> visual language, not verified source tokens. Prioritize the actual
> screenshots and logo assets when available.

## Overview

Streamtime presents project management as a way to help creative
businesses work well, not merely track tasks. Its core message balances
commercial performance with team happiness: planning, scheduling, time
tracking, job profitability, reporting, collaboration, and weekly
check-ins belong to one coherent workflow.

The design should feel **approachable, creative, optimistic, and
operationally clear**. It should avoid the cold, overly technical
appearance of enterprise project-management software. Marketing sections
can use expressive typography and large product imagery, while the
product itself needs dense but calm information surfaces.

**Key characteristics** - Human-centered language and an optimistic
tone; productivity is connected to wellbeing. - Product screenshots are
the primary proof of value: weekly planner, job profitability view,
reporting dashboard, personal dashboard, and team check-in. - Clear
feature storytelling, with one feature or workflow explained at a
time. - Friendly visual details and color accents should make the
experience feel creative without weakening data legibility. - Financial
and scheduling information should remain structured, scannable, and
trustworthy.

## Colors

### Suggested palette

The values below are a proposed implementation palette inspired by
Streamtime's friendly creative positioning. Verify against current logo
and page assets before treating them as brand-exact.

  -------------------------------------------------------------------------
  Token                     Value                   Purpose
  ------------------------- ----------------------- -----------------------
  `{colors.primary}`        `#F2C94C`               Warm yellow highlight /
                                                    primary accent

  `{colors.on-primary}`     `#252525`               Text on yellow

  `{colors.ink}`            `#242424`               Main text

  `{colors.body}`           `#55534F`               Paragraphs and
                                                    supporting text

  `{colors.mute}`           `#85827C`               Secondary labels and
                                                    metadata

  `{colors.canvas}`         `#FBFAF6`               Main warm page
                                                    background

  `{colors.surface}`        `#FFFFFF`               Main cards and panels

  `{colors.surface-soft}`   `#F3F1EA`               Secondary panels and
                                                    grouped areas

  `{colors.hairline}`       `#E6E2D8`               Borders and separators

  `{colors.success}`        `#39866A`               Healthy status /
                                                    positive progress

  `{colors.warning}`        `#D99532`               Attention and at-risk
                                                    status

  `{colors.danger}`         `#C95C52`               Over-budget / overdue /
                                                    error

  `{colors.info}`           `#547EAA`               Informational states
  -------------------------------------------------------------------------

### Usage rules

-   Use warm yellow as a recognizable accent, not as a large background
    for every section.
-   Keep dashboard surfaces predominantly white or warm off-white.
-   Use semantic colors consistently for financial health, schedule
    status, and wellbeing indicators.
-   Do not rely on color alone: pair status colors with labels, icons,
    or values.
-   Keep chart palettes restrained and distinguish series with both
    color and labels.

## Typography

### Font direction

Use a modern, highly readable sans-serif. A practical starting point is
**Inter** or **DM Sans** with system fallbacks. The exact production
font is not confirmed by the public material reviewed.

``` yaml
fontFamily:
  display: Inter, system-ui, -apple-system, sans-serif
  body: Inter, system-ui, -apple-system, sans-serif
  data: Inter, system-ui, -apple-system, sans-serif
```

### Hierarchy

  Token                         Size   Weight   Line height Use
  --------------------------- ------ -------- ------------- ------------------------
  `{typography.display-xl}`     56px      600          1.05 Hero headline
  `{typography.display-lg}`     44px      600           1.1 Section headline
  `{typography.display-md}`     32px      600           1.2 Feature / page title
  `{typography.heading-sm}`     22px      600           1.3 Card title
  `{typography.body-lg}`        18px      400          1.55 Lead paragraph
  `{typography.body-md}`        15px      400           1.5 Default interface text
  `{typography.body-sm}`        13px      400          1.45 Metadata
  `{typography.label}`          12px      600           1.3 Field labels / status
  `{typography.metric}`         28px      600           1.1 KPI values

### Principles

-   Use confident, friendly display typography in marketing areas.
-   In the app, favor clarity over expressive type; numbers and labels
    must be easy to scan.
-   Use tabular numerals for hours, currency, percentages, and dates.
-   Keep headings in sentence case rather than all caps.

## Layout

### Spacing system

Use an 8px base rhythm, with 4px increments for compact controls.

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
  `{spacing.5xl}`      88px

-   Marketing content max width: approximately 1160--1240px.
-   Dashboard shell: persistent left navigation, central work area,
    optional contextual side panel.
-   Use a 12-column marketing grid and a flexible dashboard grid.
-   Give data tables enough horizontal room; allow controlled horizontal
    scrolling on small screens.
-   Group related metrics rather than placing every value in an isolated
    card.

### Responsive strategy

  ------------------------------------------------------------------------
  Breakpoint                                   Width Behavior
  --------------------- ---------------------------- ---------------------
  Mobile                                    \< 640px Single-column
                                                     sections, compact
                                                     navigation, stacked
                                                     job summaries

  Tablet                                 640--1023px Two-column feature
                                                     grids; collapsible
                                                     navigation

  Desktop                                   ≥ 1024px Full dashboard shell
                                                     and multi-column
                                                     planning views

  Wide                                      ≥ 1440px More whitespace and
                                                     wider reporting
                                                     layouts
  ------------------------------------------------------------------------

Touch targets should be at least 44×44px on touch devices.

## Elevation & Depth

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        Background only         Marketing bands and
                                                  page canvas

  Level 1 --- Hairline    1px border, subtle      Default cards and
                          surface contrast        tables

  Level 2 --- Soft        Very subtle shadow +    Popovers, menus,
                          border                  floating controls

  Level 3 --- Overlay     Stronger shadow, modal  Dialogs and drawers
                          backdrop                
  -----------------------------------------------------------------------

Avoid stacking multiple heavy shadows. Use borders and surface contrast
to organize dense dashboards.

## Shapes

  Token                 Value Use
  ------------------ -------- --------------------------------
  `{rounded.sm}`          6px Inputs and compact controls
  `{rounded.md}`         10px Standard cards
  `{rounded.lg}`         16px Feature panels
  `{rounded.xl}`         22px Marketing feature blocks
  `{rounded.pill}`     9999px Status chips and selected tags

Use rounded geometry to soften the product, but keep table rows and data
controls relatively compact.

## Components

### Navigation

-   **`nav-bar`** --- clean horizontal marketing navigation with logo,
    section links, and a prominent demo / signup action.
-   **`app-sidebar`** --- persistent navigation for To Do, Jobs,
    Scheduling, Reporting, and team-related areas. Active item uses a
    subtle tinted surface and clear indicator.
-   **`breadcrumbs`** --- use on deep job and report pages; keep labels
    concise.

### Buttons

-   **`button-primary`** --- high-contrast accent fill with dark text;
    use for the primary action only.
-   **`button-secondary`** --- neutral surface with hairline border.
-   **`button-ghost`** --- text-first action for table rows and
    secondary navigation.
-   **`button-icon`** --- compact icon control with tooltip and
    accessible label.

### Cards & data surfaces

-   **`job-summary-card`** --- job title, client, status, owner, planned
    hours, and budget health.
-   **`kpi-card`** --- one primary metric, comparison or trend, and a
    short label.
-   **`planner-day-column`** --- date heading, capacity summary, and
    draggable scheduled work.
-   **`task-row`** --- task title, due date, job reference, assignee,
    and time estimate.
-   **`report-panel`** --- chart or table with clear title, date range,
    filters, and export action.
-   **`team-checkin-card`** --- simple mood / wellbeing input, optional
    tags, and private note affordance.
-   **`activity-feed`** --- chronological updates with compact avatars
    and readable timestamps.

### Inputs & filters

-   **`text-input`** --- white surface, subtle border, visible focus
    ring.
-   **`date-range-picker`** --- clear date labels and quick presets.
-   **`filter-chip`** --- selected filters use a light accent tint, not
    a solid saturated fill.
-   **`select`** --- compact, consistent height; avoid oversized form
    controls in dense planning screens.

### Signature patterns

-   **Weekly planner:** calendar-like columns, task cards, and a
    persistent hours-to-do / hours-done summary.
-   **Job profitability view:** financial summary at top,
    planned-versus-used time visualization, expenses/invoices, and
    activity feed.
-   **Reporting dashboard:** filters first, KPI summary, then trend
    chart and detailed breakdown.
-   **Wellbeing check-in:** lightweight, human language and a
    low-friction response flow.

## Do's and Don'ts

### Do

-   Balance financial KPIs with team-capacity and wellbeing context.
-   Make planning and job status visible at a glance.
-   Use product screenshots or realistic interface previews as proof.
-   Keep dense data readable with alignment, spacing, and tabular
    numerals.
-   Use friendly language in empty states and check-ins.

### Don't

-   Don't turn every metric into a separate floating card.
-   Don't use bright accent colors for every chart series or status.
-   Don't make wellbeing features feel like employee surveillance.
-   Don't hide critical budget or schedule information behind decorative
    UI.
-   Don't use playful illustrations where a clear product screenshot is
    more useful.

## Source notes

-   Official site: https://streamtime.net/
-   Features: https://streamtime.net/features
-   Official AI information page: https://streamtime.net/ai-info-page
-   Product areas evidenced in public material include planning, time
    tracking and scheduling, quoting and invoicing, reporting, Kanban,
    collaboration, and weekly check-ins.
