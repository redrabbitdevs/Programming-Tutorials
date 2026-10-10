# Design notes

How the site is built and why. Each borrowed detail has a source and a status:
**verified** means it was read from the live page or its CSS during this work (2026-10-10);
**recalled** means it comes from memory of the site and was not re-checked.
Josh Comeau's blog and the Stripe docs were unreachable from the build environment (proxy 403), so anything
attributed to them is recalled.

## Direction

A reading-first tutorial site in the family of the Rust Book, Svelte's tutorial, Linear and the Tailwind docs: a crisp
cool-white page, deep blue-black ink, one confident cobalt accent, a grotesque display face and a monospace that
earns its place. Code is the densest, most saturated thing on the page. Deliberately absent: cream paper, terracotta
or brick accents, serif display type, near-black with a single neon pop, any gradient, broadsheet-style rules, emoji,
glass cards, and a centred hero with three feature tiles. The home page leads with a left-aligned headline beside a
real code specimen; the learning path is a numbered list separated by faint rules, not cards.

## Borrowed details

| Detail | Applied as | Source | Status |
|---|---|---|---|
| Content column capped at 750px (about 68ch at our size); paragraph line-height 1.45em in a 62.5% root | `--measure: 68ch`, body 17px / 1.65 (we went looser because our sans is wider) | https://doc.rust-lang.org/book/css/variables-8adf115d.css (`--content-max-width: 750px`), `general-e96d0476.css` | verified |
| Sidebar fixed at 300px, `min(300px, 80vw)` so it never overflows a phone | Lesson sidebar is 17rem on desktop, becomes a disclosure under 60rem | same Rust Book stylesheets (`--sidebar-target-width`, `--sidebar-width`) | verified |
| Active sidebar entry marked by one accent colour, not a filled pill | Active lesson: 2px accent left rule plus a faint sunk background and bolder weight | Rust Book `variables-*.css` (`--sidebar-active` is a single accent per theme) | verified |
| Code font about 0.875em of body | Code at 0.875rem (EC `codeFontSize`) and inline code at 0.86em | Rust Book `--code-font-size: 0.875em` | verified |
| Docs nav as a thin vertical rail with a 1px left border, active item overlays the rail (`-ml-px`) | `.sidebar ol` and `.toc ol` use a 1px rule; link overlaps it with a 2px left border | https://tailwindcss.com/docs/installation/using-vite (class list: `border-l`, `-ml-px`) | verified |
| Sidebar items 14px on 24px line (`text-sm/6`); body prose 16px on 32px (`text-base/8`) | Sidebar 15px, TOC 14px, tighter than prose; prose gets the generous leading | same Tailwind page (274 uses of `text-sm/6`, 198 of `text-base/8`) | verified |
| Focus ring is a 2px solid outline using the link colour, via `:focus-visible` | 3px solid blue `--focus` with 2px offset. Thicker, and a fixed hue so it holds 3:1 on both themes | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide (inline CSS `outline:2px solid var(--color-link-normal)`) | verified |
| Design tokens as CSS custom properties with semantic names (`--color-text-primary`, `--color-link-normal`) | `--bg`, `--ink`, `--ink-2`, `--accent` on `:root`, swapped by `prefers-color-scheme` and overridden by `[data-theme]` | MDN (same page); `--font-sans` / `--font-mono` token naming on https://nextjs.org/docs | verified |
| Landmarks: `<nav aria-label="Primary">` and `<main id="main">` | Same names, plus a skip link targeting `#main` | https://svelte.dev/tutorial/svelte/welcome-to-svelte | verified |
| Dark mode is a blue-tinted neutral ramp (near-black `#08090A`, text `#E2E4E7`, secondary `#9c9da1` at Linear), not pure black, and it is not paired with a neon accent | Dark theme `#0b111c` page, `#e6ebf4` text, `#8f9bb0` secondary, accent lifted to a light cobalt `#86a5ff` | https://linear.app (inline CSS colour frequency), https://doc.rust-lang.org/book/css/variables-8adf115d.css (`--bg: hsl(210, 25%, 8%)`, sidebar `#14191f`: also blue-tinted) | verified |
| Track pages organised around "concepts" and "exercises" as first-class objects, with a visible track hierarchy | Level, then module, then lesson on the curriculum page; Exercise is a distinct component | https://exercism.org/tracks/python | verified (structure), recalled (visual detail) |
| A single characterful display face on headings over a plain text sans, with tight tracking; prose-first layout with a narrow measure | Bricolage Grotesque at weight 580, letter-spacing -0.015 to -0.035em, over Instrument Sans | Josh Comeau's blog (custom display headings, narrow prose measure); Exercism uses a rounded geometric display face (`PoppinsInitial` seen in its CSS) | recalled (Comeau), verified (Exercism font name) |
| Three-column docs: nav, content, right "On this page" with scroll-spy | `.lesson-shell` grid at 80rem; TOC marks the current section with IntersectionObserver | Stripe docs and Next.js docs | recalled (Next.js page fetched, the layout was not inspected) |
| Callouts as a left-ruled block with an uppercase label | `.callout`: 4px left rule, tinted fill, icon plus text label (never colour alone) | Stripe docs | recalled |
| Tabbed code with filename in the tab | Expressive Code frames (`title="hello.py"`) | Next.js and Svelte docs | recalled |

## Type

| Role | Family | Why |
|---|---|---|
| Headings, numerals | **Bricolage Grotesque** (variable, `@fontsource-variable/bricolage-grotesque`) | A grotesque with ink-trap-like notches and slightly quirky proportions at large sizes; it has character without being a serif, and is neither Inter nor Space Grotesk. |
| Body and UI | **Instrument Sans** (variable, `@fontsource-variable/instrument-sans`) | A quiet, slightly condensed humanist grotesque with good small-size legibility; it lets the display face carry the personality. |
| Code | **Commit Mono** (`@fontsource/commit-mono`, 400 and 700) | Neutral, even-colour monospace with distinct `0`, `l`, `1`. |

All three are self-hosted from `@fontsource`, bundled and hashed by Vite, with no request to Google Fonts.

Scale (minor third from a 17px body): 13 / 17 / 20.4 / 24.5 / 28 to 34 / 34 to 48 / 42 to 74 px (`--step--1` to `--step-5`).
Spacing is a 4px base: 4, 8, 12, 16, 24, 32, 48, 72, 104.

## Colour

Light: page `#fafbfd` (faint cool bias), raised `#ffffff`, sunk `#f0f3f8`, ink `#0e1726`. One accent: cobalt `#1f4fd8`.
Version markers and notes use a deep teal `#0b6b63`, so "this is version information" is a different signal from "this is
a link". Success, warning and danger exist only for callouts and status. The focus ring is a separate amber
(`#b45309` light, `#fbbf24` dark) so it never blends with the accent. Dark: page `#0b111c`, ink `#e6ebf4`, accent `#86a5ff`, teal `#5fd0c4`.

Why cobalt on cool white: it reads as "links and code" immediately, as in the Tailwind docs and the Rust Book's blue
links, and it sits far from the cream plus terracotta combination that is now a common generated look.

Contrast (WCAG ratios, computed): light, against `--bg`: ink 17.3, `--ink-2` 9.3, `--ink-3` 6.0 (5.6 on sunk), accent 6.4
(6.0 on sunk), teal 6.2, focus 4.8, `--rule-strong` 3.5 (borders of inputs and buttons, 1.4.11), white on accent 6.6.
Dark: ink 15.8, `--ink-2` 11.0, `--ink-3` 6.7, accent 8.0, teal 10.2, focus 11.3, `--rule-strong` 4.2, dark text on accent 7.8.
Callout text on its tint: 5.0 to 5.9 light, 7.5 to 8.1 dark. Interactive state never relies on colour alone: level
badges carry a word and a pip count, callouts carry a label and icon, status carries a word and a glyph shape.

## Code blocks

Expressive Code (Shiki) with `github-light` / `github-dark` token colours on custom cool backgrounds (`#f0f3f8` / `#0f1624`).
Filename tabs (`title="x.py"`), terminal frames (`frame="terminal"`), line marking (`{2,4-5}`) and a copy button on every block
are built in. Options live in `ec.config.mjs` so that the standalone `<Code>` component on the home page matches. Themes
follow `html[data-theme]` when set and the OS preference otherwise, so the toggle and the code blocks agree.

## Behaviour

- **Theme:** CSS follows `prefers-color-scheme` by default, so it works without JavaScript. An inline script in `<head>` then sets `data-theme` (stored choice, else OS preference) before first paint, and the toggle overrides the OS and persists to `localStorage`, guarded for blocked storage.
- **Lesson sidebar:** sticky and scrollable beside the lesson from 60rem; below that it is a "Course outline" disclosure (closed on phones). Current page has `aria-current="page"`.
- **Right TOC:** from 80rem, sticky, scroll-spy. Below that, an inline "On this page" disclosure above the text.
- **Language directory:** every language is in the static HTML (works without JS, indexable). JS adds search, status and paradigm filters by toggling `hidden`, syncs to the URL (`?q=&status=&par=`), and announces the count in an `aria-live` region. Rows use `content-visibility: auto`, so 700+ rows stay cheap.
- **Tabs:** progressive enhancement. Without JS all panels show under their labels. With JS: WAI-ARIA tabs with Arrow, Home and End keys.
- **Motion:** only short transitions; `prefers-reduced-motion` turns them off and disables smooth scrolling.

## WCAG 2.2 AA checklist

- 1.4.3 / 1.4.11 contrast: tokens above; focus ring 3px amber, 4.8:1 on light and 11.3:1 on dark.
- 2.4.1 skip link; 2.4.7 visible focus; 2.4.11 focus not obscured (`scroll-padding-top` clears the sticky header; the language filter bar is sticky below the header, so keep it short).
- 2.5.8 target size: header controls, buttons, form fields, tabs, summaries, pager and rows are at least 44px; the smallest (TOC items) are 28px, above the 24px minimum.
- 1.4.10 reflow: layout rules written mobile-first for 320px and up (not yet checked in a browser); tables scroll inside their own box; code scrolls inside its block.
- 1.3.1 / 4.1.2: landmarks (`header`, `nav` with labels, `main`, `footer`), one `h1` per page, `aria-current`, `aria-live` for filter results, details/summary for disclosures.
- 2.3.3 / reduced motion respected.

## Open items

- No automated accessibility or visual test is wired in yet (axe, Pa11y or Lighthouse CI would be the next step).
- Josh Comeau and Stripe references are recalled, not re-verified.
- The `Builds on` line renders unlinked text, silently, for fundamentals lessons that do not exist yet.
- Pagefind-style site-wide search is not included; the language directory has its own client-side filter.
