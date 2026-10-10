# Language ranking and tiers

Accessed 2026-10-10. Cached extracts are in `research/_catalog/sources/`.

| Source | Edition used | How it was read | Cache |
|---|---|---|---|
| Stack Overflow Developer Survey | **2026** (n = 14,099 all respondents), question "Programming, scripting, and markup languages", past-year use | direct fetch of https://survey.stackoverflow.co/2026/technology/data/languages | `sources/stackoverflow-2026-languages.md` |
| TIOBE Index | **September 2026** (latest published; the October edition was not out) | direct fetch of https://www.tiobe.com/tiobe-index/ | `sources/tiobe-2026-09.md` |
| GitHub Octoverse | **2025** (published 2025-10-28; no 2026 edition yet) | **via search** (github.blog is blocked) | `sources/octoverse-2025.md` |
| Wikipedia, List of programming languages | live page | direct fetch (MediaWiki API) | `sources/wikipedia-list-of-programming-languages.md` |

## Inputs

Stack Overflow 2026, percent of all respondents who did extensive work in the language in the past year
(HTML/CSS and "Other" are left out because they are not programming languages):

| # | Language | % | | # | Language | % |
|---|---|---|---|---|---|---|
| 1 | JavaScript | 62.0 | | 18 | Ruby | 5.8 |
| 2 | SQL | 58.4 | | 19 | Dart | 4.9 |
| 3 | Python | 58.0 | | 20 | R | 4.5 |
| 4 | Bash/Shell | 51.3 | | 21 | Nix | 4.4 |
| 5 | TypeScript | 43.8 | | 22 | GDScript | 4.0 |
| 6 | Java | 27.6 | | 23 | Visual Basic (.NET) | 4.0 |
| 7 | C# | 27.1 | | 24 | VBA | 3.9 |
| 8 | PowerShell | 24.6 | | 25 | Groovy | 3.9 |
| 9 | C++ | 24.3 | | 26 | Perl | 3.8 |
| 10 | C | 21.8 | | 27 | MATLAB | 3.6 |
| 11 | Rust | 18.0 | | 28 | Zig | 2.8 |
| 12 | PHP | 17.7 | | 29 | MicroPython | 2.7 |
| 13 | Go | 16.5 | | 30 | Lisp | 2.6 |
| 14 | Kotlin | 10.8 | | 31 | Elixir | 2.6 |
| 15 | Lua | 9.4 | | 32 | Objective-C | 2.5 |
| 16 | Assembly | 7.2 | | 33-50 | Haskell 2.3, Scala 2.2, Delphi 1.9, Fortran 1.7, Erlang 1.5, Julia 1.5, Clojure 1.3, Gleam 1.2, Ada 1.2, F# 1.2, OCaml 1.2, COBOL 1.1, Prolog 0.9, Solidity 0.8, Mojo 0.6, Odin 0.2, Elm <1 | |
| 17 | Swift | 5.9 | | | | |

TIOBE September 2026 top 20: Python, C, C++, Java, C#, JavaScript, Visual Basic, SQL, R, Rust,
Fortran, Go, Delphi/Object Pascal, PHP, Scratch, Assembly, Ada, Swift, Objective-C, COBOL.
Selected others: Kotlin 26, Lua 31, PowerShell 32, TypeScript 39, Bash in #51-100.

Octoverse 2025 (via search): TypeScript #1 on GitHub by monthly contributors, Python #2, JavaScript #3;
about 80% of new repositories use Python, JavaScript, TypeScript, Java, C++ or C#.

## Tier rules

1. **Tier 1 (full curriculum, beginner to expert):** every language with **at least 10% usage** in
   the Stack Overflow 2026 survey. That gives exactly 14 languages. Two adjustments:
   - **PowerShell moves to tier 2.** It overlaps with Bash in role (shell automation), and TIOBE ranks
     it #32. Its tier-2 track is written as deltas from Bash.
   - **Swift moves up to tier 1.** It is the primary language for Apple platforms, is in the TIOBE
     top 20 (#18, rising) and is the iOS counterpart to Kotlin on Android.
   TypeScript (TIOBE #39) and Bash (TIOBE #51-100) stay in tier 1: TIOBE counts search hits and
   undercounts both, while the survey (TypeScript 43.8%, Bash 51.3%) and Octoverse (TypeScript #1)
   show heavy real use.
2. **Tier 2 (full curriculum, shorter, deltas from a tier-1 relative):** languages with at least
   **0.5% survey usage**, plus anything in the TIOBE top 20, after removing the exclusions below.
   That gives 29 languages.
3. **Tier 3 (overview page):** every other entry in `.orchestration/languages.json`.

Excluded from tier 2 despite meeting a threshold, with reasons:

| Language | Reason | Tier |
|---|---|---|
| Nix, GDScript, GML | Tool- or engine-specific DSLs | 3 |
| VBA, Classic Visual Basic | Covered as sections of the Visual Basic (.NET) track | 3 |
| MicroPython | An implementation of Python, covered by a note in the Python track | 3 |
| Scratch | Block-based, not text-based | 3 |
| SAS, Caml | Proprietary statistics suite; OCaml covers Caml | 3 |

Dropped from the earlier provisional tier 2 list: **V, Odin, Nim, Crystal, Elm**. Each is below 0.5%
in the survey or absent from it, and outside the TIOBE top 50. They are now tier 3.
Added: **PowerShell** (moved from tier 1), **Delphi/Object Pascal** (TIOBE #13), **Ada** (TIOBE #17),
**Common Lisp** (survey "Lisp" 2.6%; Common Lisp is the dialect taught) and **Prolog** (survey 0.9%, TIOBE #29).

## Curriculum order

Python is first by project decision. It is also TIOBE #1 and survey #3. The other languages follow
by the mean of their survey rank and TIOBE rank, with these adjustments for teaching order:

- TypeScript follows JavaScript directly, because its course is built on the JavaScript one.
- SQL and Bash come after the core general-purpose languages. Their curricula are smaller and more
  tool-like, though their survey ranks are high.
- Rust comes before Go: Rust is ahead in both sources (survey 18.0% vs 16.5%; TIOBE #10 vs #12).
  This reverses the provisional order.

**Tier 1 order:** python, javascript, typescript, java, csharp, cpp, c, sql, bash, rust, go, php, kotlin, swift

**Tier 2 order** (by survey usage): powershell, lua, assembly, ruby, dart, r, visual-basic, groovy,
perl, matlab, zig, common-lisp, elixir, objective-c, haskell, scala, delphi, fortran, erlang, julia,
clojure, gleam, ada, fsharp, ocaml, cobol, prolog, solidity, mojo

## Refresh

Re-run this ranking when a new Stack Overflow survey is published (usually July) or a new Octoverse is
published (October or November). Tiers change only by an Advisor decision, so languages that are
already being written are not moved around.
