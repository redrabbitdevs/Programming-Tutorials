# Improver review: Python beginner level

Reviewed 2026-10-11 at `aa44bd2`. Live site fetched with `curl` (no screenshots). Sample: Python 01, 09, 14, 22, 28 (one per module B1 to B5), fundamentals 09, plus every page template, `global.css`, `lib/`, and the language catalogue data.

## Verdict

**What is working.** The visual system is restrained and mostly earns the "not generated" goal: no gradients, cards or glass, a cool palette with one accent, a narrow reading column, real code with filenames and printed output, and accessibility work that goes past the usual (contrast tables, 44px targets, works without JS, reduced motion). The sampled lessons are accurate, and the writing is plain and direct. Lesson 28 (scope and LEGB) is the best page on the site. Its five-puzzle debugging exercise and its "predict the output" exercise on lexical scope are what every lesson should aim for.

**What most needs to change.**
1. The language catalogue is visibly scraped. 545 of 644 summaries are one templated sentence ("Pascal is an imperative language first appeared in 1970."), and the paradigm filter lists 133 raw values, among them `cite web`. This is the strongest "AI-generated" tell on the site.
2. The Python lessons use syntax before it is taught. `def` appears in 12 lessons before the Functions module, and `for` appears before the loops lesson.
3. Most lessons open with one long code block that covers 8 to 13 ideas, followed by one block of output and then the prose. A learner has to count lines to match each output to its code.

---

## P0

### 1. Clean the language catalogue data
**Owner:** researcher (data), uiux (filter rendering)
**Files:** `site/src/content/languages/*.md` (644 files), `site/src/pages/languages/index.astro`, `.orchestration/languages.json`
**Problem:**
- 377 summaries read "X is a(n) <paradigm> language first appeared in <year>." That sentence is ungrammatical, and it is used for every Tier 1 language except Python (C, Rust, Java and so on).
- 168 summaries read "X is a programming language."
- 273 entries have paradigm `unclassified`.
- The paradigm `<select>` has 133 options. Some are Wikipedia scrape debris: `cite web`, `delphi dialect only`, `multi-dis`, `primary paradigm`, `through macros`, `with declarative sql elements`. Others are duplicates: `multi-paradigm`/`multiparadigm`, `logic`/`logical`/`logic-paradigm`, `term rewriting`/`term-rewriting`.

**Acceptance criteria:**
- All 43 Tier 1 and Tier 2 entries have a hand-written, factual summary of one or two sentences, saying what the language is used for, as Python's does.
- No summary anywhere matches `first appeared in` or `is a programming language\.`. If no good summary exists, the field is left empty, and the row shows no summary rather than filler.
- Paradigms are mapped to a fixed vocabulary of 25 terms or fewer, recorded in `content.config.ts` as an enum. `unclassified` is not shown in the UI.
- The paradigm filter shows 25 options or fewer, with no duplicates and no scrape debris.

### 2. Stop using syntax before it is taught (Python B1 to B4)
**Owner:** writer
**Files:**
- `python/beginner/01-install-python.mdx`
- `09-strings-basics.mdx`, `14-if-elif-else.mdx`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23` (all use `def`)
- `07-numbers.mdx`, `10-f-strings.mdx`, `13-booleans-truthiness.mdx`, `14`, `15` (all use `for`)

**Problem:**
- `def` is first taught in lesson 26 but is used in 12 earlier lessons. The aside "read `def` as 'name this recipe'" is repeated instead of taught.
- `for` is taught in lesson 16 but used from lesson 7 onwards.
- Lesson 09's palindrome exercise needs a generator expression (lesson 24), `str.join`, `casefold` and `isalnum` (lesson 11), and `def` (lesson 26). Its solution calls the generator expression "the generator", a term the learner has not met.
- Lesson 01's first script uses an f-string, tuple unpacking, slicing and tuple comparison. It also tells the learner to "save and run it" before lesson 02 explains how to run a file.

**Acceptance criteria:**
- Either: a short lesson, "Writing your own small functions" (`def`, parameters, `return` only), is added after lesson 08, and lesson 26 then deepens it.
- Or: every pre-26 exercise is rewritten as a plain script.
- An ordered "first taught in" table (`.orchestration/python-beginner-syntax.md` or similar) lists each construct. No lesson uses a construct before the lesson that introduces it, except for one line explicitly marked as a preview.
- Lesson 01's script uses only `print` and `sys.version`. Running a file is deferred to lesson 02.

### 3. Teach one idea per code block, and show each output next to its code
**Owner:** writer
**Files:** pattern across the sample. Worst cases are `09-strings-basics.mdx` (one 22-line block covering 13 ideas), `14-if-elif-else.mdx` (opens with if, truthiness, guard-clause functions, a for loop and a conditional expression in one block), `22-sets.mdx` (two 25-line blocks) and `fundamentals/beginner/09-functions.mdx` (the "Side effects" block also holds the call-stack and `None` examples).
**Problem:** The current pattern (wall of code, wall of output, then prose that refers back with "as the last line of the example does") is the opposite of the Rust Book and Josh Comeau. Both use small snippets, each with its own result, and build up step by step. It also makes every lesson look the same.
**Acceptance criteria:**
- In each sampled lesson, no block covers more than about three related ideas or runs longer than about 12 lines, unless it is a complete program built up across the lesson.
- Each snippet's output comes directly after it.
- Prose introduces a snippet before it appears, not only after.
- Lessons 09, 14 and 22 and fundamentals 09 are rewritten first, as the model for the rest of the level.

## P1

### 4. Fix the URL that 404s and the hard-coded base path
**Owner:** uiux (route), writer (links)
**Files:** `site/src/pages/learn/` (new `fundamentals/index.astro` or redirect), `fundamentals/beginner/07-conditionals.mdx`, `08-loops.mdx`, `09-functions.mdx`, `10-scope-and-lifetime.mdx`, `11-recursion.mdx` (10 links in all)
**Problem:**
- Confirmed: `/learn/fundamentals/` returns 404. Every fundamentals lesson lives under that path, so anyone who trims the URL hits a dead end.
- Confirmed: 10 links hard-code `/Programming-Tutorials/learn/...`. Module 1 (01 to 06) has none. The affected lessons are 07 to 11, which make up module 2, not modules 1 and 2. Other lessons use relative `../slug/` links.

**Acceptance criteria:**
- `curl -s -o /dev/null -w '%{http_code}'` on `/learn/fundamentals/` returns 200, either by rendering the track page or by a meta-refresh plus canonical link to `/fundamentals/`.
- `grep -r "/Programming-Tutorials/" site/src/content` returns nothing.
- A build-time internal link check (for example `astro-broken-links-checker` or a small script over `dist/`) runs in CI and fails on any broken internal link.

### 5. Give the 643 empty language pages one honest state
**Owner:** uiux (template), researcher (Tier 1 and 2 copy)
**Files:** `site/src/pages/learn/[lang]/index.astro`, `site/src/lib/lessons.ts` (`TIER_INFO`)
**Problem:**
- Every language except Python renders four identical dashed boxes reading "Not written yet." under Beginner, Intermediate, Advanced and Expert.
- `TIER_INFO[3]` promises "Reference page: history, syntax sample and a path in", but none of the 601 Tier 3 pages has any of that, and the body of the `.md` file is never rendered.

**Acceptance criteria:**
- A language with no lessons shows a single short notice (status, and what is planned), not four empty level blocks.
- The Tier 3 description says only what the page really contains, until reference content exists.
- If a language `.md` file has body content, it is rendered.
- Pages for Tier 3 languages with no content carry `<meta name="robots" content="noindex">` until they have content.

### 6. Make the 644-row catalogue searchable and scannable
**Owner:** uiux
**Files:** `site/src/pages/languages/index.astro`, `site/src/styles/global.css` (`.lang-row`, `.filters`)
**Problem:**
- Tier 3 is a single list of 601 rows.
- The Status filter is close to useless, because 643 of 644 languages are `planned`.
- Search is an unranked substring match across name, slug, paradigm and summary, so short queries such as `c`, `go` or `r` match hundreds of rows.
- There is no way to jump by letter.

**Acceptance criteria:**
- Search results are ranked: exact name, then name prefix, then name substring, then other fields.
- A query of `c` puts C, C#, C++ and Clojure in the top rows.
- Tier 3 has A to Z jump links, or is grouped by first letter with sticky letter headers.
- The Status filter is replaced by a "Has lessons" toggle until more than one status is meaningful.
- The filter bar stays within one row at 40rem and up.

### 7. Cut the lesson preamble and the micro-label system
**Owner:** uiux
**Files:** `site/src/pages/learn/[lang]/[...slug].astro`, `site/src/components/mdx/Exercise.astro`, `global.css` (`.lesson-head`, `.objectives`, `.exercise-head`, `.callout-title`, `.toc h2`, `.pager .dir`, `.sidebar h2`, `.eyebrow`)
**Problem:**
- Before the first sentence of a lesson, the reader passes: breadcrumbs (which repeat the title), three pill badges, the H1, the lede, the "Builds on" line, a boxed "BY THE END YOU CAN" list, and "On this page".
- Seven separate small-caps, letter-spaced labels (eyebrow, objectives, callout, TOC, pager, sidebar, exercise) plus a solid black exercise header bar give a templated, component-kit look. The Rust Book and Stripe docs get the reader into the prose within one screen.

**Acceptance criteria:**
- On a 1280x800 viewport, the first paragraph of lesson text starts above the fold.
- The breadcrumb's last item is not a repeat of the H1.
- The level, time and version badges are one quiet text line, not three pills.
- Objectives are collapsed by default or moved below the intro paragraph.
- Uppercase tracked labels are used in at most two places site-wide.
- The exercise uses a ruled or tinted frame, with no solid ink header bar.

### 8. Raise the quality and consistency of exercises
**Owner:** writer
**Files:**
- `22-sets.mdx` ("Common friends": the input data appears only in the solution)
- `14-if-elif-else.mdx` (the grade-calculator solution ends with an unrelated leftover, `age = 17` / `status = ...`, and prints `minor`)
- `28-scope-legb.mdx` ("Predict the output": the solution repeats the prompt's code in full)
- `09-strings-basics.mdx` and most of 03 to 12 (one exercise each)

**Acceptance criteria:**
- Every exercise prompt states its inputs and the expected output, or a test the learner can check against.
- Each lesson has at least two exercises: one warm-up that uses only this lesson's new idea, and one stretch exercise that combines it with earlier lessons.
- Solutions contain no code unrelated to the task.
- Lessons 01 to 12 adopt the lesson 28 style (predict, debug, fix) at least once per module.

### 9. Sync and remember the language tab choice
**Owner:** uiux
**Files:** `site/src/components/mdx/Tabs.astro`, `Tab.astro`
**Problem:** Fundamentals lessons have several Python, JavaScript, Java and C tab groups per page. Choosing C in one group resets nothing else, every group starts on the first tab, and nothing is remembered between pages. A learner arriving from the Python track has no way to make Python stick. Stripe and Docusaurus both sync tabs by label.
**Acceptance criteria:**
- Selecting a tab label selects the same label in every tab group on the page and is stored in `localStorage`, guarded for blocked storage.
- The stored choice is restored on later pages.
- A `?lang=python` query, appended by Python lessons' "Builds on" links, preselects the matching tab.
- OS tabs (Windows, macOS, Linux) in lesson 01 use a separate sync key from programming-language tabs.

### 10. Make the fundamentals track match its own promise
**Owner:** writer
**Files:** `site/src/pages/fundamentals/index.astro` (lede), `fundamentals/beginner/09-functions.mdx`, and the same pattern in other module 2 lessons
**Problem:**
- The track page says these ideas are "taught once here, without any one syntax". In fundamentals 09, only the first example is shown in four languages. The side-effects, call-stack and `None` examples and all three exercises are Python only.
- A learner in a future JavaScript or C track would find the track Python-first.

**Acceptance criteria:**
- Either the lede says honestly "examples in Python, with JavaScript, Java and C alongside for key ideas", or each concept example and at least one exercise per lesson has tabs in all four languages.
- The call-stack example sits under the "The call stack" heading, not inside the "Side effects" code block.

## P2

### 11. Make version badges carry information
**Owner:** researcher
**Files:** frontmatter `minVersion` across `python/beginner/*.mdx`. Specific mismatches:
- `22-sets.mdx` shows the 3.14+ error text `cannot use 'list' as a set element (unhashable type: 'list')` but declares `3.8`.
- `28-scope-legb.mdx` shows the 3.11+ wording `cannot access local variable ...` but declares `3.8`.
- `01-install-python.mdx` shows `3.11+` on a page about installing 3.15.

**Problem:** "Python 3.8+" appears on 21 of 31 rows (3.9+ on two more) of the curriculum page, so the badge is noise, and in places it is wrong about the output shown. Python 3.8 is end-of-life.
**Acceptance criteria:**
- A badge is shown only when `minVersion` is newer than the oldest supported release.
- Each displayed `minVersion` is checked against the code and output on that page.
- Error-message outputs that vary by version carry a note.
- The 3.15.0 release date (`2026-10-09` in `languages/python.md` and lesson 01) is confirmed against python.org.

### 12. Remove the generated tells from the home hero
**Owner:** uiux
**Files:** `site/src/pages/index.astro`, `global.css` (`.hero`, `.eyebrow`, `.picker`)
**Problem:**
- The hero uses the uppercase eyebrow pattern ("FREE, OPEN SOURCE, VERSIONED") and a single accent-coloured word in the headline, both common generated patterns.
- The specimen's caption says the lesson flags 3.10 "next to the code", but the specimen itself shows no `<Since>` marker.
- "Pick a language" is a list of 14 names, 13 of them marked Planned.

**Acceptance criteria:**
- No eyebrow, and no colour highlight on a headline word.
- The specimen shows a real `Since 3.10` chip in its frame.
- The home page leads with the one available track: Python, its 31 lessons and module names, and the first lesson.
- Planned languages are collapsed into a single line linking to the catalogue.

### 13. Keep the current lesson visible in a long sidebar
**Owner:** uiux
**Files:** `site/src/pages/learn/[lang]/[...slug].astro`, `global.css` (`.sidebar`)
**Problem:** The Python outline already has 31 entries in 5 modules and will reach more than 120 across four levels. On lesson 28, the current entry is below the visible part of the sticky sidebar.
**Acceptance criteria:**
- On load, the active entry is scrolled into view inside the sidebar, without moving the page.
- Levels other than the current one are collapsed (`<details>`).
- The module headings in the sidebar are links to that module on the curriculum page.

### 14. Vary the lesson template, and drop the duplicate "Next:" line
**Owner:** writer
**Files:** all `python/beginner/*.mdx` and `fundamentals/beginner/*.mdx`
**Problem:**
- Every lesson ends with the same sequence: Common pitfalls, Exercise, Summary, then a "Next: ..." line that repeats the pager directly below it.
- The pitfalls list often repeats the body. In lesson 28, three pitfalls restate the puzzles word for word.
- A uniform skeleton across 49 lessons is itself a generated tell.
- Python lessons link to fundamentals with `../../../fundamentals/...` relative paths, which break if the trailing-slash setting changes.

**Acceptance criteria:**
- The "Next:" line is removed wherever the pager shows the same lesson.
- "Common pitfalls" lists only mistakes that the body does not already cover, or is folded into the body.
- Section headings are written for the lesson, not taken from the template, in at least half of the level.
- Links to fundamentals go through one consistent root-relative form that the link check covers (item 4).

### 15. Add sharing metadata and font preloads
**Owner:** uiux
**Files:** `site/src/layouts/BaseLayout.astro`
**Problem:** Pages have no Open Graph or Twitter tags, so a shared lesson link unfurls with no title card. The three web fonts are not preloaded, so the large display headings visibly swap fonts on load.
**Acceptance criteria:**
- `og:title`, `og:description`, `og:url` and `og:type` are set, with one static `og:image` on brand.
- The display face and body face (latin subset) are preloaded with `font-display: swap` confirmed.
- `curl` of any lesson page shows the `og:` tags.
