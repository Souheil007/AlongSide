---
description: An inspired design-system interpretation of Alloy Planning
  --- a collaborative product-management workspace combining customer
  feedback, idea intake, flexible planning views, roadmaps, and Linear
  synchronization in a playful but structured SaaS interface.
name: AlloyPlanning-design-analysis
version: alpha
---

# Alloy Planning --- Design System

> **Scope and confidence:** Based on the supplied `/planning` page and
> its visible product examples, including the navigation, idea board,
> table, hierarchy, whiteboard, roadmap, feed, Linear sync, and theme
> options. Exact font and CSS token declarations are not available in
> the reviewed page text. Palette values and measurements below are
> approximations; the page visibly advertises light, dark, neutral,
> forest, and blue themes, so preserve theme flexibility rather than
> assuming a single fixed palette.

## Overview

Alloy Planning describes itself as a product-native companion to Linear
for collecting ideas, managing customer feedback, and building roadmaps.
The page demonstrates flexible hierarchies, multiple planning views,
cross-team intake, customer insights, roll-up roadmaps, and real-time
collaboration.

The visual system should feel **modern, collaborative, structured, and
slightly playful**. Its interface blends the clarity of a productivity
tool with the flexibility of a whiteboard. Emoji and friendly labels add
personality, while tables, fields, status values, and roadmap structures
keep the product grounded.

**Key characteristics** - Product-first UI previews are central to the
marketing page. - One dataset can be viewed as a whiteboard, table,
board, roadmap, or feed. - Flexible hierarchy connects company strategy,
goals, initiatives, and projects. - Customer feedback and idea intake
should connect clearly to prioritization and planning. - Multiple themes
are part of the product story; theme tokens must be semantic and
swappable. - Real-time collaboration needs visible presence and activity
cues without visual noise.

## Colors

### Suggested default light theme

The values below are approximations for a clean neutral theme. The live
page explicitly presents several theme choices; use semantic tokens so
themes can be swapped without changing component logic.

  Token                     Value       Purpose
  ------------------------- ----------- ---------------------------------
  `{colors.primary}`        `#5865E8`   Primary action / selected state
  `{colors.on-primary}`     `#FFFFFF`   Text on primary
  `{colors.ink}`            `#242630`   Main text
  `{colors.body}`           `#5E6270`   Supporting text
  `{colors.mute}`           `#9296A3`   Metadata
  `{colors.canvas}`         `#FFFFFF`   Main background
  `{colors.surface}`        `#FAFAFC`   Cards and panels
  `{colors.surface-soft}`   `#F1F2F6`   Grouped areas / hover
  `{colors.hairline}`       `#E5E6EC`   Borders and separators
  `{colors.success}`        `#3B9B78`   Completed / healthy
  `{colors.warning}`        `#D69A43`   At risk / attention
  `{colors.danger}`         `#D65B66`   Blocked / error
  `{colors.info}`           `#5A8BD8`   Informational

### Theme tokens

Keep these roles stable across theme variants:

``` yaml
theme:
  light:
    canvas: "#FFFFFF"
    surface: "#FAFAFC"
    ink: "#242630"
    body: "#5E6270"
    hairline: "#E5E6EC"
  dark:
    canvas: "#171923"
    surface: "#202330"
    ink: "#F4F5F8"
    body: "#B5B8C4"
    hairline: "#343847"
  neutral:
    primary: "#626875"
  forest:
    primary: "#397B5A"
  blue:
    primary: "#4E78D4"
```

The neutral, forest, and blue accents above are proposed theme
interpretations, not confirmed exact theme values.

### Usage rules

-   Use neutral surfaces for most of the workspace; accent color marks
    selection and important actions.
-   Use semantic colors for project status and progress, not as
    decorative fills.
-   Keep board columns and roadmap groupings readable when multiple
    statuses are visible.
-   Theme changes must preserve contrast and chart / status meaning.
-   Use emoji sparingly as category cues; never make them the only
    identifier.

## Typography

### Font direction

Use a modern UI sans-serif. **Inter** is a practical default for dense
tables, navigation, and controls. The exact live font is not confirmed.

``` yaml
fontFamily:
  display: Inter, system-ui, -apple-system, sans-serif
  body: Inter, system-ui, -apple-system, sans-serif
  data: Inter, system-ui, -apple-system, sans-serif
```

### Hierarchy

  Token                         Size   Weight   Line height Use
  --------------------------- ------ -------- ------------- --------------------
  `{typography.display-xl}`     54px      650          1.06 Marketing hero
  `{typography.display-lg}`     42px      650          1.12 Section headline
  `{typography.display-md}`     30px      600           1.2 Page title
  `{typography.heading-sm}`     16px      600          1.35 Card / group title
  `{typography.body-lg}`        16px      400           1.5 Lead text
  `{typography.body-md}`        14px      400          1.45 Default interface
  `{typography.body-sm}`        12px      400           1.4 Metadata
  `{typography.label}`          11px      600           1.3 Field labels
  `{typography.metric}`         24px      600           1.1 Counts and KPIs

### Principles

-   Use compact typography in data-dense views.
-   Keep table headers and field labels distinct from values.
-   Use medium weights for hierarchy; avoid heavy bold across every row.
-   Keep titles short and action labels explicit.

## Layout

### Spacing system

Use a 4px base scale with 8px / 12px / 16px common intervals.

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

-   Marketing content width: approximately 1160--1240px.
-   Product shell: left navigation + central workspace + optional
    contextual panel.
-   The main planning area should have flexible width and allow
    horizontal scrolling for large boards.
-   Keep table rows compact, with consistent column alignment.
-   Use consistent spacing between hierarchy levels and clear
    indentation.
-   For roadmap views, preserve time scale and grouping while allowing
    zoom / density changes.

### Responsive strategy

  ------------------------------------------------------------------------
  Breakpoint                                   Width Behavior
  --------------------- ---------------------------- ---------------------
  Mobile                                    \< 640px Navigation becomes
                                                     drawer; table
                                                     switches to card-like
                                                     records; board
                                                     columns scroll
                                                     horizontally

  Tablet                                 640--1023px Sidebar collapses;
                                                     detail panel becomes
                                                     drawer

  Desktop                                   ≥ 1024px Full workspace with
                                                     sidebar and multiple
                                                     planning views

  Wide                                      ≥ 1440px More visible columns
                                                     and expanded roadmap
                                                     range
  ------------------------------------------------------------------------

Do not force a dense planning table into a narrow viewport. Provide
responsive record cards or controlled horizontal scroll.

## Elevation & Depth

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        Canvas only             Main workspace

  Level 1 --- Hairline    1px border              Cards, rows, table
                                                  groups

  Level 2 --- Soft        Subtle shadow           Menus, popovers,
                                                  draggable cards

  Level 3 --- Overlay     Modal shadow + backdrop Idea forms, dialogs,
                                                  command menus
  -----------------------------------------------------------------------

Use elevation to clarify draggable and floating objects. Most planning
surfaces should rely on borders and surface contrast.

## Shapes

  Token                 Value Use
  ------------------ -------- ---------------------------------
  `{rounded.xs}`          4px Small tags and compact controls
  `{rounded.sm}`          6px Inputs and buttons
  `{rounded.md}`         10px Idea cards and panels
  `{rounded.lg}`         14px Large feature panels
  `{rounded.pill}`     9999px Status / category chips

Keep card shapes consistent across board, feed, and whiteboard views so
the same item feels like the same entity.

## Components

### Navigation

-   **`workspace-sidebar`** --- Search, Feed, Customers, My Projects,
    Goals, Planning, and workspace areas.
-   **`workspace-switcher`** --- organization / team context.
-   **`view-switcher`** --- Whiteboard, Table, Board, Roadmap, Feed.
-   **`breadcrumbs`** --- company goal → initiative → project hierarchy.

### Buttons

-   **`button-primary`** --- create / submit / start actions.
-   **`button-secondary`** --- neutral outlined action.
-   **`button-ghost`** --- table and toolbar actions.
-   **`button-icon`** --- compact actions with tooltips.
-   **`button-create`** --- persistent create action in the current
    planning context.

### Planning surfaces

-   **`idea-card`** --- title, type, customer / segment, status, owner,
    and key metadata.
-   **`board-column`** --- status or planning group with count and
    drag-and-drop cards.
-   **`planning-table`** --- configurable columns, filters, grouping,
    sorting, and inline editing.
-   **`roadmap-lane`** --- time-based initiative / project blocks with
    dependencies and status.
-   **`whiteboard-canvas`** --- freeform cards, sticky notes,
    connectors, and grouping.
-   **`feed-item`** --- chronological idea or feedback activity with
    author and timestamp.
-   **`hierarchy-node`** --- company strategy, goal, initiative, and
    project with nested counts.
-   **`customer-feedback-card`** --- feedback text, customer, source,
    related idea, and status.
-   **`request-form`** --- intake form with title, goal, quarter,
    context, and submit action.
-   **`presence-indicator`** --- collaborator avatar and active state.

### Inputs & controls

-   **`search-input`** --- global search across ideas, customers, and
    projects.
-   **`filter-bar`** --- status, customer, goal, owner, and time period.
-   **`field-picker`** --- choose visible columns and custom fields.
-   **`group-select`** --- group by status, goal, customer, or priority.
-   **`theme-switcher`** --- light, dark, neutral, forest, blue.
-   **`date / quarter-picker`** --- planning period and roadmap horizon.

### Signature patterns

-   **One item, multiple views:** maintain the same data identity when
    switching between board, table, roadmap, feed, and whiteboard.
-   **Flexible hierarchy:** show parent-child relationships and roll-up
    counts without overwhelming the workspace.
-   **Customer-to-roadmap flow:** connect customer feedback to ideas,
    prioritization, and planned work.
-   **Cross-team intake:** show request status, owning team, company
    goal, and target quarter.
-   **Linear sync:** make sync state and external project references
    visible but unobtrusive.

## Do's and Don'ts

### Do

-   Keep the same idea / project visually recognizable across all views.
-   Make custom fields and filters discoverable.
-   Show collaboration presence without excessive notifications.
-   Use clear hierarchy and consistent status semantics.
-   Preserve readability when tables become dense.

### Don't

-   Don't turn every view into a separate design system.
-   Don't use emoji as the only way to identify a project category or
    status.
-   Don't make whiteboard freedom undermine structured data.
-   Don't hide sync errors or stale integration states.
-   Don't compress roadmaps so far that dates and dependencies become
    ambiguous.

## Source notes

-   Planning page: https://alloy.app/planning
-   The page demonstrates idea collection, customer feedback, flexible
    hierarchy, whiteboard / table / board / roadmap / feed views, Linear
    sync, request intake, cross-team roll-ups, and theme choices.
