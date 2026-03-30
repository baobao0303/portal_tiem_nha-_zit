# DESIGN.md - The Curated Emerald
**Product**: Cho Design Admin Platform  
**Atmosphere**: Sophisticated, managerial clarity, editorial luxury, curated green aesthetics.

## 1. Visual Theme & Atmosphere
The Curated Emerald fuses high-end editorial aesthetics with robust data-density requirements of a modern e-commerce platform. The environment prioritizes an organic, almost architectural layout governed by subtle off-white surfaces (`surface`) and rich, dark green focal points (`primary`). It relies on sharp border contrasts rather than heavy background fills.

## 2. Color Palette & Roles

### Base & Surfaces
- **Surface (Background)**: `#f7faf8` - The foundational canvas. An off-white with a very faint tint of mint.
- **On-Surface (Text)**: `#181c1b` - Primary text color for maximum legibility without the harshness of pure black.
- **Surface Variant**: `#e0e3e1` - Used for secondary panels or dividers.
- **On-Surface Variant**: `#3e4946` - Muted text for subtitles and metadata.

### Accents & Brands
- **Primary**: `#005147` - The "Curated Emerald". Used for primary buttons, active states, and focus elements.
- **On-Primary**: `#ffffff` - Text on top of active primary areas.
- **Primary Container**: `#006b5e` - Used for larger accent blocks, graphs, and less prominent highlights.
- **Primary Fixed Dim**: `#83d5c5` - Softer green for chart distributions and inactive visual accents.

### Semantic Status
- **Error**: `#ba1a1a` - Serious destructive actions.
- **Secondary (Info/Pending)**: `#005db7` (Blue) and `#8f4c36` (Warm Neutral).

## 3. Typography Rules
The system employs a dual-typeface strategy to separate stylistic branding from data density.

- **Headline (`font-headline`)**: `Manrope` (Weights: 200, 400, 600, 700, 800)
  - *Usage*: Page titles, KPI numbers, Sidebar branding, and H1-H4.
- **Body (`font-body`)**: `Inter` (Weights: 300, 400, 500, 600)
  - *Usage*: Table rows, descriptions, input fields.
- **Label (`font-label`)**: `Inter` (Uppercase, Tracking-Widest)
  - *Usage*: Table headers, kicker tags, micro-copy. 

## 4. Component Stylings

### Navigation (Sidebar)
- Fixed `w-64` layout.
- Active state uses a heavy emerald border: `border-r-4 border-emerald-700 bg-emerald-100 font-bold`.
- Inactive state: `text-emerald-700/70 font-medium hover:bg-emerald-100`.

### KPI Bento Cards
- Background: `bg-surface-container-lowest` (`#ffffff`) for maximum contrast against the `bg-surface`.
- Border Radius: `.rounded-xl`.
- Shadow: Subtle shadow offset `shadow-[0_4px_24px_rgba(0,0,0,0.02)]`.
- Interaction: Micro-scale on hover `group hover:scale-[1.02] transition-transform duration-300`.

### Iconography
- Uses **Google Material Symbols Outlined** natively via `<span class="material-symbols-outlined">`.
- Default optical size: `opsz 24`, weight `400`.

## 5. Layout Principles
- **Sidebar & Header**: The app follows a classic dashboard paradigm. Fixed left sidebar (`w-64`) and fixed top navbar with dynamic width margin `w-[calc(100%-16rem)]`.
- **Content Padding**: The main viewport (`<main>`) utilizes generous spacing: `pt-24 px-8 pb-12` to ensure breathing room below the fixed 16px header.
- **Bento Grids**: Analytics use responsive CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).

## 6. Depth & Elevation
- **Level 1 (App Canvas)**: `bg-surface` (`#f7faf8`).
- **Level 2 (Cards & Areas)**: `bg-surface-container-lowest` (`#ffffff`) augmented with a 4px custom shadow spread to simulate paper-like layering.
- **Level 3 (Sticky Navbars)**: Headers use `bg-white/80 backdrop-blur-md` for visual glassmorphism over scrolling content.

## 7. Do's and Don'ts
- **DO**: Use `Manrope` exclusively for large numeric metrics and page titles.
- **DO**: Leverage `routerLinkActive` to apply heavy emerald right-borders on navigation lists.
- **DON'T**: Use standard Tailwind `bg-blue-500` or generic colors. Always use the mapped `--color-*` token variables (e.g. `text-primary`).
- **DON'T**: Use heavy drop shadows (`shadow-lg` or `shadow-xl`); this design relies on `0.02` opacity shadows for elite minimalism.

## 8. Responsive Behavior
- Sidebars dynamically adjust or require drawer-implementations below `lg`.
- KPI Grids stack completely vertical on mobile, 2-column on iPad (`md`), 4-column on desktop (`lg`).
- Tables strictly overflow-x via wrapper `<div class="overflow-x-auto">`.

## 9. Agent Prompt Guide
**When instructing an AI to build components for this project:**
- "Build a card using DESIGN.md. Use the KPI bento style with `bg-surface-container-lowest` and the 0.02 opacity shadow."
- "Create a new form input. Use `font-body` for the text and `font-label` for uppercase labels."
- "Add a new button. For primary actions, use `bg-primary text-on-primary`."
