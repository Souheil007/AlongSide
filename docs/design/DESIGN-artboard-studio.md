---
description: An inspired design-system interpretation of Artboard Studio
  --- a visual creation workspace for realistic mockups, product scenes,
  branding, and motion assets, combining a polished creative storefront
  with a capable browser-based editor.
name: ArtboardStudio-design-analysis
version: alpha
---

# Artboard Studio --- Design System

> **Scope and confidence:** Based on Artboard Studio's public marketing
> pages and descriptions of its mockup library, browser editor, video
> mockups, AI mockup generation, and Figma / Adobe Express integrations.
> Exact brand colors, font files, and editor tokens are not documented
> in the reviewed page text. Values below are practical approximations;
> use actual product screenshots and logo assets to verify.

## Overview

Artboard Studio helps designers apply images and videos to realistic
mockups across devices, apparel, packaging, print, and branding. Its
product combines a large asset library with an online editor, scene
customization, high-resolution exports, motion mockups, and AI-assisted
generation.

The visual system should feel **creative, premium, visual-first, and
approachable**. The marketing site needs to make the mockup library
desirable through large imagery and clear category browsing. The editor
should feel like a professional creative tool: precise controls, a
predictable workspace, and enough neutral space for the artwork to
remain the focus.

**Key characteristics** - Product imagery is the main visual language:
realistic mockups, carefully art-directed scenes, and high-quality
previews. - Browsing is category-led: devices, apparel, packaging,
print, and branding. - The online editor should separate canvas, asset
selection, layers, and properties. - AI generation is a workflow
extension, not a replacement for direct editing. - Export quality and
supported formats should be clear and easy to discover.

## Colors

### Suggested palette

A neutral creative-workspace palette with a saturated violet accent is
proposed here. Treat the accent as an approximation and verify against
current Artboard Studio brand assets.

  ---------------------------------------------------------------------------
  Token                       Value                   Purpose
  --------------------------- ----------------------- -----------------------
  `{colors.primary}`          `#6B55E8`               Primary action /
                                                      selection

  `{colors.on-primary}`       `#FFFFFF`               Text on primary

  `{colors.ink}`              `#202027`               Main text

  `{colors.body}`             `#5E5D68`               Secondary text

  `{colors.mute}`             `#92919D`               Metadata

  `{colors.canvas}`           `#FFFFFF`               Marketing and editor
                                                      canvas

  `{colors.surface}`          `#F7F7FA`               Cards and side panels

  `{colors.surface-strong}`   `#EEEEF3`               Hover / selected
                                                      neutral

  `{colors.editor-canvas}`    `#E8E8EF`               Work area surrounding
                                                      the artboard

  `{colors.hairline}`         `#E3E3EA`               Borders

  `{colors.dark-panel}`       `#22222B`               Optional dark tool /
                                                      preview panel

  `{colors.success}`          `#2D9A70`               Export complete

  `{colors.warning}`          `#D99A39`               Unsaved / attention

  `{colors.danger}`           `#D65A68`               Error

  `{colors.info}`             `#5689D9`               Informational state
  ---------------------------------------------------------------------------

### Usage rules

-   Keep the editor canvas neutral so artwork and mockups carry the
    color.
-   Use the primary accent for selection, active tools, and main calls
    to action.
-   Use product photography as the primary source of visual richness;
    avoid adding competing gradients and decorations.
-   Keep panel borders subtle and controls visually quiet.
-   Dark panels may be used for preview or timeline areas, but should
    not dominate the entire application.

## Typography

### Font direction

Use a contemporary geometric or neo-grotesque sans-serif for the product
UI. **Inter** is a practical default; a slightly more expressive display
face can be used in marketing headlines if confirmed by the current
site. Use monospace only for technical metadata.

``` yaml
fontFamily:
  display: Inter, system-ui, -apple-system, sans-serif
  body: Inter, system-ui, -apple-system, sans-serif
  code: ui-monospace, SFMono-Regular, Menlo, monospace
```

### Hierarchy

  Token                         Size   Weight   Line height Use
  --------------------------- ------ -------- ------------- ---------------------
  `{typography.display-xl}`     60px      650          1.05 Marketing hero
  `{typography.display-lg}`     44px      650           1.1 Section title
  `{typography.display-md}`     30px      600           1.2 Editor / page title
  `{typography.heading-sm}`     17px      600          1.35 Panel title
  `{typography.body-lg}`        17px      400          1.55 Marketing lead
  `{typography.body-md}`        14px      400           1.5 Editor UI
  `{typography.body-sm}`        12px      400          1.45 Metadata / controls
  `{typography.label}`          11px      600           1.3 Tool labels
  `{typography.code}`           12px      400           1.5 Technical values

### Principles

-   Marketing typography can be expressive; editor typography must be
    compact and functional.
-   Keep tool labels short and consistent.
-   Use clear hierarchy between section title, asset title, and asset
    metadata.
-   Avoid small low-contrast text over photography.

## Layout

### Spacing system

Use a 4px base unit. Editor panels use compact spacing; marketing
sections use larger rhythm.

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

### Marketing layout

-   Centered content width: approximately 1180--1280px.
-   Hero should lead with a concise promise and a large, high-quality
    mockup visual.
-   Category browsing should use large image tiles with consistent crop
    ratios.
-   Use visual examples to explain the online editor, video mockups, and
    AI generator.
-   Keep pricing and export details close to relevant product
    capabilities.

### Editor layout

-   **Top bar:** document name, undo/redo, preview, save state, export.
-   **Left rail:** tools and asset categories.
-   **Asset panel:** searchable mockup library and thumbnails.
-   **Center stage:** artboard / mockup preview on a neutral work
    surface.
-   **Right inspector:** selected object properties, background, scene,
    transform, and export settings.
-   **Timeline:** optional lower panel for video / animation editing.

### Responsive strategy

  ------------------------------------------------------------------------
  Breakpoint                                   Width Behavior
  --------------------- ---------------------------- ---------------------
  Mobile                                    \< 640px Marketing browse
                                                     experience only;
                                                     editor actions
                                                     simplified

  Tablet                                 640--1023px Collapsible side
                                                     panels; central
                                                     canvas remains
                                                     primary

  Desktop                                   ≥ 1024px Full editor with
                                                     asset browser,
                                                     canvas, and inspector

  Wide                                      ≥ 1440px More canvas room and
                                                     persistent side
                                                     panels
  ------------------------------------------------------------------------

Do not attempt to compress a full desktop editor into a narrow phone
layout. Prioritize preview, basic editing, and export, with advanced
controls moved into drawers.

## Elevation & Depth

  -----------------------------------------------------------------------
  Level                   Treatment               Use
  ----------------------- ----------------------- -----------------------
  Level 0 --- Flat        Neutral editor          Canvas surround
                          background              

  Level 1 --- Hairline    1px border              Side panels, asset
                                                  cards, controls

  Level 2 --- Soft        Light shadow            Floating inspector
                                                  popovers and menus

  Level 3 --- Overlay     Stronger shadow +       Dialogs, export panel,
                          backdrop                AI generation modal
  -----------------------------------------------------------------------

Use subtle elevation to separate editor chrome from the canvas. Do not
place heavy shadows around every thumbnail.

## Shapes

  Token                 Value Use
  ------------------ -------- ----------------------------
  `{rounded.xs}`          4px Small controls
  `{rounded.sm}`          6px Buttons and inputs
  `{rounded.md}`         10px Asset thumbnails and cards
  `{rounded.lg}`         16px Marketing feature panels
  `{rounded.xl}`         22px Large showcase surfaces
  `{rounded.pill}`     9999px Tags and status chips

Use consistent thumbnail geometry and preserve the natural shape of the
mockup itself.

## Components

### Navigation

-   **`marketing-nav`** --- logo, product categories, resources,
    pricing, sign-in, and primary start action.
-   **`editor-topbar`** --- document title, save status, undo/redo,
    preview, export.
-   **`tool-rail`** --- icon-led editing tools with tooltips and active
    state.
-   **`asset-browser`** --- category navigation, search, filters, and
    thumbnail grid.
-   **`property-inspector`** --- contextual controls for the selected
    mockup, layer, or scene.

### Buttons

-   **`button-primary`** --- accent fill for create, generate, or
    export.
-   **`button-secondary`** --- neutral outlined action.
-   **`button-ghost`** --- low-emphasis toolbar action.
-   **`button-icon`** --- compact editor control with tooltip and
    keyboard shortcut where relevant.

### Creative surfaces

-   **`mockup-card`** --- large thumbnail, title, category, and optional
    premium marker.
-   **`category-tile`** --- image-led entry for devices, apparel,
    packaging, print, or branding.
-   **`canvas-stage`** --- neutral surround with centered artboard and
    zoom controls.
-   **`layer-row`** --- thumbnail, name, visibility, lock, and
    selection.
-   **`property-group`** --- collapsible settings with consistent labels
    and controls.
-   **`background-picker`** --- solid color, image, or generated scene
    options.
-   **`export-panel`** --- format, resolution, dimensions, and export
    action.
-   **`timeline-track`** --- clip strip, playhead, and playback controls
    for video mockups.
-   **`generation-prompt`** --- prompt field, style selector, generate
    action, and progress state.

### Inputs & controls

-   **`search-input`** --- search mockups by category, device, style, or
    keyword.
-   **`color-picker`** --- compact swatch grid plus precise value input.
-   **`slider`** --- zoom, opacity, blur, and transform values with
    numeric readout.
-   **`segmented-control`** --- image / video or editor mode selection.
-   **`format-select`** --- PNG, JPEG, WEBP, MP4, or WEBM where
    supported.

### Signature patterns

-   **Browse → apply → customize → export:** make this workflow obvious
    and repeatable.
-   **Mockup preview:** prioritize the artwork surface; controls should
    not compete with the visual.
-   **AI generation:** show prompt, style, progress, and editable
    result; make it clear that generated scenes can be refined.
-   **Video mockup:** provide a clear timeline and playback preview
    without changing the core editor layout.

## Do's and Don'ts

### Do

-   Let high-quality mockup imagery carry the visual identity.
-   Keep the editor canvas visually quiet.
-   Use consistent asset thumbnails and clear category labels.
-   Make export formats and resolution easy to understand.
-   Preserve keyboard, undo/redo, and direct-manipulation affordances.

### Don't

-   Don't use decorative gradients behind every section.
-   Don't overcrowd the canvas with panels.
-   Don't let asset thumbnails have inconsistent crops or aspect ratios.
-   Don't make AI generation a separate visual universe from the editor.
-   Don't hide premium / free distinctions or export constraints.

## Source notes

-   Official website: https://artboard.studio/
-   Mockup tool: https://artboard.studio/mockup
-   Public product description includes device, apparel, packaging,
    print, and branding mockups; browser-based editing; video mockups;
    AI mockup generation; and Figma / Adobe Express plugins.
