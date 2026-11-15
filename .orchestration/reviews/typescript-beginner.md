# Improver review: TypeScript beginner level (gap and quality audit)

Reviewed 2026-11-15 at `3facf71`, the head of `claude/focused-fermi-z89kyv-114-typescript-b6`. That branch holds B1–B6, lessons 01–32. B6 is not merged yet. B1–B5 are already on `main` (B4 and B5 arrived in #113). I checked the lessons against `research/typescript/outline.md`, `facts.md` and `.claude/agents/writer.md`. I built the site with `npm ci && npm run build` (949 pages, no errors) and read the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 04. **Read closely by section:** 17 (and its rendered page), 18 (typeof-null and truthiness), 19 (the `Symbol.hasInstance` section), 22 (`?.` and `??`). **Read in part:** 01, 02, 03, 06, 13, 15, 16, 25, 31. I also read every heading, every exercise title and the prerequisite sentence of all 32 lessons.

## What was measured, and how

| Check | Result |
|---|---|
| `check_frontmatter`, `check_fundamentals`, `check_headings`, `check_lesson_examples`, `check_lesson_style`, `check_links` | All pass. `check_lesson_examples` skips one TS block (28:137, `dist/main.js`). |
| `check_versions` | 0 failures. 7 redundant `<Since>` warnings (items 5 and 7). |
| Step 2d of `validate.sh` (tsc 7.0.2 from `tools/ts`) | 23 folders type-checked, 112 deliberate type errors matched, 306 programs run, all 306 equal to their `.out`. Same result on **Node 22.23.4** and **Node 24.22.1**. There was no Node 26 binary here to test with. |
| Every `<Since>` (17 tags, 7 versions) tested with older tsc releases | **All 17 correct.** Each feature fails one release earlier and passes in the tagged one: `export type *` (TS1383 in 4.9, passes in 5.0), `verbatimModuleSyntax` (TS5023 in 4.9), `undefined` return with no `return` (TS2355 in 5.0, passes in 5.1), mixed tuple labels (TS5084 in 5.1), `switch (true)` and `Symbol.hasInstance` narrowing (TS2339 and TS2359 in 5.2), always-truthy regex (TS2872 is new in 5.6), `rewriteRelativeImportExtensions` (TS5023 in 5.6), `erasableSyntaxOnly` (TS5023 in 5.7), and the `tsc --init` contents (5.8 against 5.9). Untagged claims I also checked: `in` narrowing on `object` (4.8 fails, 4.9 passes), TS5112 and `strict` on by default (5.9 against 6.0). |
| Error codes named in prose | 6 codes had no `.tsfail` file backing them: TS7034, TS7005, TS2358, TS5097, TS1295, TS1287. I reproduced all 6 with tsc 7.0.2, and the lessons describe them correctly. |
| Stale or removed items (`ts-node`, ES5, `baseUrl`, `node10`, `assert {}`, speed claims) | They appear only in "do not copy this" pitfalls (02:104, 04:169). |
| Prose words (code and tags excluded) | Mean 968, range 803–1,597. Only 32 is over 1,400 (item 11). |
| Body code blocks | 0 over 20 lines and 0 over 80 columns. 12 places put a code block straight after another with no text (item 10). |
| Exercises | 96, exactly 3 per lesson. Every prompt states the expected result. One prompt repeats body code (12, "Fix the callback": it is a near-copy, which is acceptable). |
| First use of TS constructs (script) | Unions, aliases, narrowing and classes are used before the lessons that teach them. In each case one sentence explains them on the spot, but there are no links (item 9). Type predicates (`x is T`) are used once with no explanation (item 3). |
| Banned style | 0 em dashes, 0 "Let's", 0 "the documentation says". "just" appears 4 times. |
| Rendered language page and badges | Badges render as `TypeScript X.Y+`, with a "Requires TypeScript X.Y or later" tooltip and screen-reader text. Level blurbs are present, and "Latest version" reads TypeScript 7.0.2 (July 2026), which is correct. The paradigm line is not right (item 4). **39 output boxes render empty** (item 1). |

## Verdict

**What is working.** The facts are right. Every version tag holds up against real compilers, and all 306 examples pass on Node 22 and 24. The B1 lessons separate the two tools clearly: "Node runs it, tsc checks it". The 6.0-default story (`strict`, `types: []`, TS5112) is current. Each exercise names its expected result. The level teaches only the types and rarely re-teaches JavaScript. Most lessons set `minVersion` to the core path and tag newer features with `<Since>` (08, 14, 18, 19), which follows the writer rule.

**What most needs to change.** In B4 and B5, which are already on `main`, 39 "Output" boxes that should hold the compiler error are empty, so the reader sees a blank box where the lesson's point should be. Second, the level quietly depends on the JavaScript *intermediate* class, `this` and symbol lessons, but it says it needs only JavaScript beginner.

---

## P0

### 1. 39 empty compiler-output blocks in lessons 17–27
**Owner:** writer
**Files:** each `npx tsc --noEmit --ignoreConfig --pretty false X.ts` command in these lessons is followed by an empty ` ```text ` block. Lines are those of the empty block:
- `17-union-types.mdx`: 61, 111, 175, 224
- `18-narrowing-basics.mdx`: 95, 251, 295
- `19-in-instanceof-narrowing.mdx`: 68, 142
- `20-discriminated-unions.mdx`: 73, 172, 201
- `21-exhaustiveness.mdx`: 83, 155, 250, 279
- `22-null-and-undefined-strict.mdx`: 40, 172, 251
- `23-interfaces-vs-aliases.mdx`: 106, 126, 175
- `24-index-signatures-and-records.mdx`: 68, 90, 133, 267
- `25-classes-in-typescript.mdx`: 74, 150, 207, 235, 293, 348
- `26-implements-and-structural.mdx`: 86, 146, 298
- `27-optional-and-readonly-modifiers.mdx`: 72, 192, 216, 266

**Why:** each of these blocks renders in `dist` as an empty "Output" box (39 found by `grep '<pre data-language="text"[^>]*><code></code>'`). The prose around them refers to the missing text. For example, 17:55 says "The error names the whole union" and 18:93 says "`value` is still `string[] | null`", but the reader never sees the error that would show it. B2, B3 and B6 fill these blocks correctly, for example 10:64 and 11:57. The matching `.tsfail` files hold the real message, for example `b4/narrow_typeof_null.tsfail`: `narrow_typeof_null.ts(3,12): error TS18047: 'value' is possibly 'null'.` No current check compares a lesson's compiler-output block with its `.tsfail` file, so this got through review.
**Fix:** paste the real `tsc --pretty false` output into each block. Get it from the `.tsfail` file, or rerun tsc 7.0.2 in the example folder. Then extend `scripts/check_lesson_examples.py`, or add a check, so that it fails on an empty `text` block after a `tsc` command and compares a filled block with the sibling `.tsfail`.
**Acceptance:** 0 empty `text` blocks under `typescript/` (`grep -Pzo '```text\n\s*```'` finds none), and 0 empty "Output" boxes in `dist/learn/typescript`. Every message line in the 39 blocks matches tsc 7.0.2 output. The new check fails if any one block is emptied again.

## P1

### 2. The level needs JavaScript intermediate, but says it needs only JavaScript beginner
**Owner:** researcher (outline), then writer
**Files:** `research/typescript/outline.md:30` ("Assumes the JavaScript Beginner level"), `01-what-is-typescript.mdx:20` ("assumes the JavaScript beginner track"). The lessons that depend on intermediate JavaScript are:
- `16-this-in-typescript.mdx:18` (links `javascript/intermediate/this-in-depth`) and `:108` ("Classes get a full treatment in a later module")
- `19-in-instanceof-narrowing.mdx:18` and `:209` (intermediate `classes` and `symbols`)
- `25-classes-in-typescript.mdx:18` (intermediate `classes` and `private-and-static`)
- `26-implements-and-structural.mdx`, which is all classes

**Why:** JS classes, `#private`, `static`, `extends`/`super` and symbols are JS intermediate lessons I1 (01–07), not beginner. A learner who followed the stated path reaches lessons 16, 25 and 26 without ever having seen class syntax. 16:108 also promises "a full treatment in a later module", but lesson 25 covers only the types and sends the learner back to JS intermediate.
**Fix:** choose one of the two:
- (a) State the real prerequisite. In the outline and in 01:20, add "and JavaScript intermediate lessons 01–04 (this, prototypes, classes, private and static) before module B5". Put a one-line prerequisite note at the top of 16, 25 and 26.
- (b) Give 25 a short "class syntax in one screen" section with a link, and cut the intermediate-only material (item 3).

Then correct 16:108 so it names where class syntax is taught.
**Acceptance:** the outline, lesson 01 and each lesson that links to `javascript/intermediate/` agree on the prerequisite. No lesson promises coverage that a later TS lesson does not give.

### 3. Lesson 19 uses type predicates and well-known symbols that the level does not teach
**Owner:** writer
**Files:** `19-in-instanceof-narrowing.mdx:207-232` (the "Custom instanceof with Symbol.hasInstance" section), the recap bullet at `:354`, and the objective/description in the frontmatter.
**Why:** the example declares `[Symbol.hasInstance](value: unknown): value is string[]`. That one line combines a computed symbol key (JS intermediate 07), a type predicate (outline I4 `type-predicates`, intermediate) and a niche 5.3 feature. A half-sentence ("declared as a type guard") is all the explanation it gets. This is the only `x is T` in the beginner level. It is also the least useful item in an otherwise strong lesson.
**Fix:** move the section to the intermediate `type-predicates` lesson, where `x is T` is taught, and keep only the `switch (true)` part of the 5.3 material here. Update the description, objectives and recap to match. If it has to stay, add two sentences that explain what `value is string[]` means and link forward to `type-predicates`.
**Acceptance:** no `\bis\s+[\w\[\]]+\s*\{` return annotation appears in beginner lessons without an explanation and link. The lesson's three exercises do not need the feature, and they do not today.

### 4. The TypeScript language page shows a garbled paradigm line
**Owner:** uiux
**Files:** `site/src/content/languages/typescript.md:5`, `site/src/lib/paradigms.ts:21,37`, `site/src/pages/learn/[lang]/index.astro:27`
**Why:** `dist/learn/typescript/index.html` reads "Paradigm: functional, metaprogramming and generic, imperative, object-oriented". The raw value `generic` is mapped to the directory filter group "Metaprogramming and generic", and that filter label leaks onto the page header. The JavaScript page reads "object-oriented, functional, imperative, scripting". For a typed superset of JavaScript, "metaprogramming" is wrong, and the order differs from the JS page for no reason.
**Fix:** set `paradigm: ["object-oriented", "functional", "imperative", "generic"]`, ordered like JavaScript. Then show the raw paradigm names on the language page (keep the groups for the directory filter), or add a "Generic" group so `generic` stops matching `meta`. Check that no other language page loses information when you do this.
**Acceptance:** the TS page header lists only plain paradigm names, in the JS order, with no filter-group labels. The directory filter still finds TypeScript under Object-oriented and Functional.

### 5. Lesson 25's minVersion shows a "TypeScript 5.8+" badge on the classes lesson
**Owner:** writer
**Files:** `25-classes-in-typescript.mdx:8` (`minVersion: "5.8"`) and `:377` (redundant `<Since v="5.8" />`)
**Why:** the writer rule says `minVersion` is the lowest version the core path needs. Typed fields, `private`, `#private`, `protected`, `readonly`, `override` and `abstract` all work in 5.0. Only the `erasableSyntaxOnly` remark at 377 needs 5.8. The language page and the lesson header tell a learner on 5.x that classes need 5.8. `check_versions` flags the tag as redundant for the same reason.
**Fix:** set `minVersion: "5.0"` and keep `<Since v="5.8" />` at 377.
**Acceptance:** `check_versions.py` prints no warning for 25, and the lesson card on `/learn/typescript/` shows no badge.

### 6. Version and behaviour facts are stated without a source link
**Owner:** writer
**Files:** only 4 external links in 32 lessons (01:117, 03:22, 04:18, 04:62). Unsourced version claims include:
- 02:39 (native package)
- 14:126 (5.1 change)
- 18:232 (5.6 checks)
- 19:52 and 19:178 (4.9 and 5.3)
- 24:161 and 27:80 (`tsc --init` 5.9)
- 25:377, 28:135, 29:108, 30:36 (option releases)
- 30:68 (Node 26 removed `--experimental-transform-types`)
- 31:55 (`@types/node` per Node line)

**Why:** the writer standard says "State facts directly and link the source". The JS and Python levels link release notes beside version claims. `facts.md` already holds the URL for each of these.
**Fix:** link the release note or Node doc next to each `<Since>` sentence and each version claim. Use the URLs in `facts.md` ("Language features by version", the Node type-stripping table).
**Acceptance:** every paragraph that holds a `<Since>` tag or a specific TS/Node version number has a link to a primary source.

## P2

### 7. Redundant `<Since>` tags in B6
**Owner:** writer
**Files:** `28-modules-in-typescript.mdx:135` (5.7, minVersion 5.7), `29-type-only-imports.mdx:108, 166, 295` (5.0, which is the course floor and needs no tag per `facts.md`), `30-erasable-syntax.mdx:36, 379` (5.8, minVersion 5.8)
**Why:** each tag repeats the page badge. A "TypeScript 5.0+" badge next to `verbatimModuleSyntax` suggests that 5.0 is unusual, when it is the floor.
**Fix:** remove the six tags. Keep the version in prose if it helps, for example "added in 5.8".
**Acceptance:** `check_versions.py` prints 0 warnings for `typescript/`.

### 8. Lesson 22 re-teaches JavaScript `?.` and `??`
**Owner:** writer
**Files:** `22-null-and-undefined-strict.mdx:70-150` ("Optional chaining" and "Nullish coalescing")
**Why:** the call and index forms of `?.` (`optional_chain_forms.ts`) and the `??` against `||` comparison (`nullish_vs_or.ts`) are run-time JavaScript, taught in `javascript/beginner/null-undefined-nullish`. The TypeScript content is one sentence in each section ("adds `undefined` to the type", "removes those two members").
**Fix:** link the JS lesson at the start of each section. Keep one example each that shows the *type* before and after (hover or annotation). Drop or shorten the run-time comparison of the forms. Lesson 18 shows how: it treats truthiness and `0` as a narrowing pitfall and links `coercion` in its opening (18:18).
**Acceptance:** each section opens with the JS link, and its examples are about types. The lesson stays within the word budget.

### 9. Narrowing and unions are used before their lessons with no forward link
**Owner:** writer
**Files:** `14-void-and-undefined.mdx:154` (`number | undefined`), `15-overloads.mdx:27-36` (unions, plus `Array.isArray` described as narrowing), `15-overloads.mdx:163, 222, 250, 272`, `10-any-unknown-never.mdx:67` ("narrowed")
**Why:** the writer rule allows one sentence of explanation *and a link to the lesson that teaches it*. 04:243 and 11:22 do this for unions. Lessons 10, 14 and 15 explain in place but never link to [union types](../union-types/) or [narrowing basics](../narrowing-basics/).
**Fix:** at the first use in 10, 14 and 15, add a forward link to `union-types` and `narrowing-basics`.
**Acceptance:** every lesson before 17 that uses `A | B` links `union-types`. Every lesson before 18 that relies on narrowing links `narrowing-basics`.

### 10. Two code blocks back to back with no text between them
**Owner:** writer
**Files:** 03:32, 03:52, 04:156, 05:98, 05:118, 26:54, 29:156, 30:147, 30:190, 31:28, 31:101, 31:122. Lines are the second block. Most are a `ts` file followed directly by its `bash` command. 04:156 and 31:28 are `bash` followed by `json`.
**Why:** the writer standard says "never put two code blocks back to back with no text". Elsewhere the level puts a sentence before each command ("Run it:", "Check it:").
**Fix:** add one short sentence before each second block, saying what the command does or what the file is.
**Acceptance:** a scan for consecutive non-output fences with only whitespace between them finds 0 in `typescript/beginner`.

### 11. Lesson 32 is over the prose budget
**Owner:** writer
**Files:** `32-project-typed-quiz.mdx` (1,597 prose words; the next highest is 01 at 1,093)
**Why:** the standard is about 1,400 words, and a project lesson is no exception.
**Fix:** cut the "Going further" section to a list, and shorten the stage introductions that restate the plan.
**Acceptance:** at most 1,400 prose words, with the same five stages and three exercises.

### 12. Exercise 06 asks for one annotation and the solution adds two
**Owner:** writer
**Files:** `06-annotations-and-inference.mdx:227` (prompt) and `:245` (solution adds `function first(): number`)
**Why:** the prompt says "Add one annotation that fixes both errors", and the solution then also annotates the return type. It calls this optional, but that muddles the lesson's own point, which is to annotate only where inference cannot help.
**Fix:** remove `: number` from `first` in the solution and in `examples/typescript/b2/ex_empty_array.ts`. Tested: with only `queue: number[]`, tsc 7.0.2 passes.
**Acceptance:** the solution has exactly one annotation, and `validate.sh` step 2d passes.

### 13. Long exercise solutions in B4 and B5
**Owner:** writer
**Files:** `25-classes-in-typescript.mdx`: `ex_account.ts` (34 lines) and `ex_shapes.ts` (36 lines). `20-discriminated-unions.mdx`: `ex_fetch_state.ts` (28 lines).
**Why:** the 20-line rule does not cover solutions, but a 36-line solution is hard to compare with your own attempt. B1–B3 solutions stay under 25 lines.
**Fix:** split each one into "(continued)" parts with a sentence between them, or move the printing code out of the part being checked.
**Acceptance:** no solution block is over 25 lines.

### 14. Exercises are missing from the page outline, and the closing heading differs from other tracks
**Owner:** uiux
**Files:** 01–31 put the three `<Exercise>` blocks under `## Common pitfalls`, with no heading of their own. Only 32 has `## Exercises`. All 32 lessons end with `## Recap`, while the JS and Python lessons (236 of them) end with `## Summary`.
**Why:** "On this page" lists no Exercises entry for 31 lessons, and the exercises look like part of the pitfalls section. The closing heading changes name from one track to the next.
**Fix:** decide the site convention: an `## Exercises` H2 (JS uses it in 67 of 78 lessons), or have the `Exercise` component add a TOC entry. Decide too whether the closing section is called "Summary" or "Recap". Then ask the writer to apply both across `typescript/`.
**Acceptance:** each TS lesson's TOC has an Exercises entry, and the closing heading matches the other tracks.

### 15. The outline's minVersion values have drifted from the lessons
**Owner:** researcher
**Files:** `research/typescript/outline.md:48, 59, 68, 69` (arrays-and-tuples 5.2, void-and-undefined 5.1, narrowing-basics 5.6, in-instanceof-narrowing 5.3). The lessons use 5.0 with `<Since>` tags. Lesson 25 should also move to 5.0 (item 5).
**Why:** the lessons follow the writer rule (core path in `minVersion`, newer parts tagged), but the outline still gives the newest feature's version. Writers of later levels copy the outline.
**Fix:** restate the outline's minVersion rule to match `writer.md:24`, and update the five rows.
**Acceptance:** every beginner row's minVersion equals the lesson frontmatter (a script comparing the two prints nothing).
