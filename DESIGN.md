# Nexora Design System

## 1. Visual Theme & Atmosphere

**Nexora** represents a premium, high-end SaaS aesthetic inspired by industry leaders like Linear and Framer. The atmospheric experience center is built around high-fidelity background visuals—specifically muted, looping cinematic videos—layered with high-transparency "Glassmorphism" surfaces.

The design philosophy favors **transparency, depth, and motion**. Instead of solid solid colors, we use semi-transparent white surfaces (`rgba(255, 255, 255, 0.4)`) combined with heavy background blurs (`backdrop-filter: blur(20px)`) and ultra-fine white borders to create a "frosted glass" look that feels premium and light.

**Key Characteristics:**
- **Dynamic Backgrounds**: Use of preloaded cinematic background videos with static poster fallbacks.
- **Glassmorphism**: Layered surfaces with transparency and blur.
- **Serif Contrast**: The juxtaposition of elegant `Instrument Serif` headings against functional `Inter` body text.
- **Micro-Animations**: Extensive use of entrance animations (fade-in, slide-up) to give a sense of life and responsiveness.
- **Deep Elevation**: Use of large, soft shadows (`--shadow-dashboard`) to ground floating glass elements.

---

## 2. Brand Identity & Colors

We use an HSL-based design system for maximum flexibility and consistency.

### Core Canvas (HSL)
- **Background**: `hsl(0 0% 100%)` (White) — Primary surface color.
- **Foreground**: `hsl(210 14% 17%)` (Dark Charcoal) — Primary text color.
- **Primary**: `hsl(210 14% 17%)` — Branding and primary interactive elements.
- **Accent**: `hsl(239 84% 67%)` (Vibrant Indigo) — Important highlights and active states.

### Semantic Roles
- **Muted**: `hsl(0 0% 96%)` / `hsl(184 5% 55%)` — Background fills and secondary text.
- **Border**: `hsl(0 0% 90%)` — Default separation lines.
- **Glass Border**: `rgba(255, 255, 255, 0.5)` — Specific for glassmorphic elements to catch light.

---

## 3. Typography Rules

Hierarchy is established through the interplay of a sophisticated Serif and a clear Sans-Serif.

### Font Families
- **Display/Headings**: `'Instrument Serif'`, serif. Used with dynamic italics for a bespoke feel.
- **Body/UI**: `'Inter'`, sans-serif. Clean, highly legible, used for all functional text.

### Hierarchy Scale

| Role | Font | Weight | Note |
|------|------|--------|------|
| **Logo/Brand** | Body | 700+ | High tracking tightness |
| **Hero Heading** | Display | 400 | Often italicized, large scale (3rem+) |
| **Section Title** | Display | 600 | Tight letter-spacing (-0.02em) |
| **Sub-headers** | Body | 600-700 | Uppercase with wide tracking for labels |
| **Body Copy** | Body | 400-500 | Standard line-height 1.5 |
| **Micro Labels** | Body | 500-600 | 11px size, 0.2em tracking |

---

## 4. Component Standards

### Glassmorphic Cards
- **Background**: `rgba(255, 255, 255, 0.4)`
- **Blur**: `backdrop-filter: blur(20px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.5)`
- **Radius**: `3xl` (Rounded-3xl) for a soft, friendly feel.
- **Inner Padding**: Typically `p-8` for content cards.

### Interactive Elements
- **Buttons (Primary)**: Rounded-xl, high shadow, primary HSL background.
- **Inputs**: `bg-secondary/30` with `border-border`. Rounded-xl. Focus state uses `--color-accent` with a soft ring.
- **Links**: Accent color, font-semibold, hover underline.

---

## 5. Animation & Motion

All new pages should feel "alive" through the following motion rules:

### Entrance Animations (Tailwind CSS Animate)
- **Primary Content**: `animate-in fade-in slide-in-from-bottom-8 duration-1000`.
- **Secondary Elements**: Staggered delays (e.g., `delay-100`, `delay-200`) using `duration-700`.
- **Transitions**: All hover states must use `transition-all duration-300` or `duration-500` for smooth property shifts.

---

## 6. Implementation Checklist

When building new pages under the Nexora system:
1. [ ] **Video Background**: Is the video preloaded in `index.html`? Does it have a `poster` image?
2. [ ] **Typography**: Are headings using `font-display` (`Instrument Serif`)?
3. [ ] **Centering**: Use `flex-grow flex flex-col items-center justify-center` for hero-style pages.
4. [ ] **Glassmorphism**: Is the card using the blur + transparent border combination?
5. [ ] **Animation**: Does the content fade in on load?
6. [ ] **Iconography**: Use `lucide-angular` icons configured globally in `app.config.ts`.
