# Python beginner level: gap audit (W4)

- Audited 2026-10-11 at commit aa44bd2. Scope: `site/src/content/lessons/python/beginner/` (B1-B5, lessons 01-31) plus fundamentals lessons 01-18 in `site/src/content/lessons/fundamentals/beginner/` (the track includes modules 1-3).
- Compared against: `research/python/outline.md`, the official tutorial (docs.python.org/3/tutorial/, chapters 1-5 and the beginner parts of 6-9), `research/python/facts.md`, and beginner curricula (Exercism Python track, Real Python basics path).

## Summary

- **Outline coverage is complete.** All 31 planned beginner lessons exist, with matching slugs and order.
- **3.13-3.15 coverage is good.** Present: 3.13 REPL, 3.14 REPL highlighting and lazy annotations, 3.15 UTF-8 default, `frozendict`, unpacking in comprehensions, the 3.12 f-string grammar, and Python 3.10 EOL. Nothing in `facts.md` that matters to beginners is missing. `sentinel` (PEP 661) is deliberately left to the advanced level (module A1).
- **No outdated content found.** The lessons mention `typing.List`/`Optional` only as things to avoid. No removed modules are taught.
- **The real gaps are pedagogical.** Beginners have no lesson on reading error messages, no import basics, no handling of bad input, and no project. Exercises are thin in module B1-B2 (one per lesson).

## P0: fix before the intermediate level starts

### 1. Reading tracebacks and error messages (missing topic)
- Owner: writer
- Why: "Traceback" appears in one beginner lesson (29) and no lesson explains how to read one. The official tutorial's chapter 8 and every beginner curriculum start from this. `facts.md` highlights 3.11 fine-grained error locations, 3.13 coloured tracebacks and better "Did you mean" messages, none of which is taught.
- Acceptance:
  - New lesson (suggest slug `reading-errors`, placed in B1 or B3) covers the traceback layout (read bottom-up), `SyntaxError`, `IndentationError`, `NameError`, `TypeError` and `ValueError`, and the 3.11+ caret markers (`<Since v="3.11" />`).
  - Every code block's output is verified by running it on 3.15.
  - It has an exercise that diagnoses 5 broken snippets.
  - The outline and the lesson count (31 to 32) are updated.

### 2. try/except used without being introduced
- Owner: writer
- Why: Lessons 16, 20, 21, 23 and 28 use `try/except` (for example `except KeyError as error:` in 21-dicts) with no explanation. Lesson 03 says "`try` and `except` come in the intermediate course", yet beginners hit them by lesson 16. `int(input())` has no recovery path.
- Acceptance:
  - Either the new lesson from item 1 (or a companion) teaches `try/except/else` and catching `ValueError` and `KeyError`, or lesson 16 (the first lesson to use it) gets a short boxed explanation, with a back-link from 21, 23 and 28.
  - The "intermediate course" promise in lesson 03 is reworded to match.
  - The intermediate `exceptions` lesson (I1) covers only what is new: the hierarchy, `finally`, EAFP and `raise`.

### 3. No project at all in the beginner level
- Owner: writer
- Why: There is no capstone or mini-project (the only "project" hits are an install note and a directory walker). Exercism and Real Python both end each block with a project. The best candidates already exist as exercises: the guessing game (15), the todo manager (19), the word-frequency counter (21).
- Acceptance:
  - At least 2 guided mini-projects, each tied to a module: a text game after B3 and a contacts or inventory manager after B4/B5.
  - Each project has a spec, starter code, staged milestones, a full solution, and sample output verified on 3.15.
  - Each uses only taught features.
  - It can be a "Project" component or a final-lesson section.
  - The outline lists it.

## P1: important for a learner

### 4. Import basics and a first look at the standard library
- Owner: writer
- Why: Only `math` is imported (07). There is no `import` statement explanation, no `random`, and the tutorial's chapter 6 ideas (`import`, `from ... import`, `dir()`, `help()`, `python -m`) are missing. The guessing game needs `random` and `import`. The intermediate `modules-imports` lesson assumes the basics.
- Acceptance:
  - A section or lesson covers `import x`, `from x import y`, `import x as y`, `dir()`/`help()` on a module, and a tour of `math`, `random`, `statistics` and `datetime` (read-only, one example each).
  - It states that your own file must not shadow a stdlib name (for example `random.py`).
  - It links forward to I2.

### 5. Exercise depth in B1-B2 (lessons 01-12)
- Owner: writer
- Why: Lessons 01-12 and 15, 17, 18 have one exercise each. Lessons 13, 14, 16 and 19-31 have two. Early lessons carry the highest drop-off risk.
- Acceptance:
  - Every lesson has at least 2 exercises (one easy, one stretch), with solutions and verified output.
  - Where one exists, the second exercise is a "predict the output" or "fix the bug" item.

### 6. Missing `pass`, `del`, and `reversed`/looping techniques
- Owner: writer
- Why: The tutorial's chapter 4 teaches the `pass` statement (4.5), but `pass` appears only incidentally in lesson 28. The tutorial's "Looping techniques" (5.6) include `reversed()`, `items()` and `sorted()` in loops. `reversed(` is never used, and `abs()` is never introduced.
- Acceptance:
  - `pass` is taught in 14 or 26 (empty block, stub function).
  - `reversed()` and `dict.items()` loop idioms are taught in 16 or 21.
  - `abs`, `min`, `max`, `sum`, `any` and `all` appear in a "useful built-ins" table.

### 7. Reading files and writing a first file
- Owner: writer
- Why: Beginners cannot persist anything. File I/O is planned for I1 (`files-pathlib`), but the tutorial's chapter 7.2 is a beginner topic and the projects (item 3) are stronger with a save file.
- Acceptance:
  - Either a short B5-end section ("a first look at files") covers `with open(..., encoding="utf-8")`, `read()`, iterating lines and `write()`, or the project explicitly defers files and says so.
  - The existing UTF-8 default note in 12 is cross-linked.
  - Output is verified.

### 8. Debugging habits for beginners (print debugging, rubber-duck, `breakpoint()` pointer)
- Owner: writer
- Why: Fundamentals has a debugging concept, but nothing in the Python beginner track connects it to `print`, `repr` and `f"{x=}"` practice or to `breakpoint()`.
- Acceptance:
  - A section (in the item 1 lesson) shows print debugging with `{x=}` and `!r`, introduces `breakpoint()` as a pointer to I5, and has a "find the bug" exercise.

### 9. Check the fundamentals-to-Python hand-off for modules 1-3
- Owner: researcher
- Why: Every Python lesson links to a fundamentals lesson in its `fundamentals:` field. Fundamentals lessons 01-18 exist, but this audit did not check that each Python lesson's links resolve or that the Python lesson avoids re-teaching the concept.
- Acceptance:
  - A short checklist reports, for each of the 31 lessons, whether the `fundamentals:` slug resolves and whether the Python lesson only adds Python syntax and idioms.
  - Broken links are listed with the lesson number.

## P2: nice to have

### 10. Command-line arguments and running scripts with arguments
- Owner: writer
- Why: Tutorial chapter 2 covers `sys.argv`. Beginners run scripts only through `input()`.
- Acceptance: One short section in 02 or 03 shows `python script.py name` and `sys.argv[1]`, and defers `argparse` to E3.

### 11. Complex numbers and `bool` as an `int` subclass footnote
- Owner: writer
- Why: Lesson 07 skips `complex`, which the tutorial's calculator chapter mentions only briefly. Low value.
- Acceptance: A one-line callout, or an explicit decision to leave it out and record it in the outline.

### 12. Old-style `%` formatting and `str.format()` recognition
- Owner: writer
- Why: Beginners meet `"%s" % x` and `"{}".format(x)` in older tutorials and Stack Overflow. Lesson 10 mentions `str.format()` only in a pitfall.
- Acceptance: A short "you will see this in old code" box with one example each, marked as legacy.

### 13. Cheat sheet and glossary page for the beginner level
- Owner: writer
- Why: Real Python and Exercism provide a recap. There are 31 lessons and no consolidated reference.
- Acceptance: A one-page cheat sheet of syntax, built-in types and common errors, with links to the lessons, listed in the module index.

### 14. A "where next" bridge into the intermediate level
- Owner: writer
- Why: Lesson 31 ends the track with type hints and no pointer onward.
- Acceptance: Lesson 31 (or an end-of-level page) lists what the intermediate level covers (errors, files, modules, OOP) and a self-check quiz of 10 questions.

### 15. Accessibility of version-gated code
- Owner: researcher
- Why: Lessons 10, 21 and 24 contain 3.12 or 3.15-only code. Learners on 3.11-3.14 see `SyntaxError` or `NameError`.
- Acceptance: Every version-gated block has an older-version alternative or is labelled with `<Since v=... />` immediately before the code, and the label matches the lesson's `minVersion` frontmatter. (The 3.15-only `comprehensions` lesson sets `minVersion: "3.15"` even though most of it runs on 3.8. Decide whether `minVersion` means "needed anywhere" or "needed throughout" and apply it consistently.)

## Catalog check (`.orchestration/languages.json`)

- The file has 644 entries. Python is tier 1.
- Fixed in this commit: the `wikipedia` field was a wrong or redirect target for three entries. Each is now `null`, because en.wikipedia has no dedicated page for any of them.

| slug | old link | what it actually is |
|---|---|---|
| `babbage` | `GEC_4000_series` | the computer series, not the language |
| `cayenne` | `Lennart_Augustsson` | the language's author, not the language |
| `cg` | `High-Level_Shader_Language` | HLSL, a sibling language (the Cg article redirects there) |

- Not checked: whether any programming language is missing from the catalog. A full completeness check is outside this beginner-level audit and should be done by the researcher against a language index.
