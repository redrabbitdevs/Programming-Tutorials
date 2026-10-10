# Fundamentals track (language-agnostic)

The shared track is written once and linked from every language course. Language lessons tagged
`[F]` assume the matching fundamentals lesson and teach only that language's syntax and quirks.

- Examples use pseudocode, with side-by-side snippets in 2-3 tier-1 languages (Python, JavaScript, C)
  where seeing several languages helps.
- None of these lessons depends on a language version, so there is no minVersion. Version-specific
  facts belong in the language tracks.
- 28 lessons in 5 modules. Each lesson: slug, title, objectives, key concepts, exercise idea.

## Module F1 - Programs and data (6 lessons)

| # | slug | title | objectives | key concepts | exercise idea |
|---|---|---|---|---|---|
| 1 | `what-is-a-program` | What a program is | Explain source code, compile vs interpret, and how a program runs | instructions, source vs machine code, compiler, interpreter, runtime, REPL | Trace a 5-line pseudocode program by hand and predict its output |
| 2 | `tools-of-the-trade` | Editors, terminals and running code | Use a terminal, an editor and a run command | shell, working directory, paths, editor vs IDE, stdout/stderr, exit codes | Run a provided program from the terminal, then change it and run it again |
| 3 | `values-and-types` | Values and types | Classify values by type and predict type errors | integers, floats, strings, booleans, null/none, static vs dynamic typing, strong vs weak typing | Sort 15 literals into types; predict which mixed operations fail |
| 4 | `variables-and-assignment` | Variables and assignment | Explain names, binding, mutation and scope basics | name vs value, assignment, reassignment, constants, naming conventions | Swap two variables three ways; trace a variable table |
| 5 | `expressions-and-operators` | Expressions and operators | Evaluate expressions using precedence | arithmetic, comparison, logical operators, precedence, integer vs float division, overflow, float imprecision | Evaluate 10 expressions by hand, then check them in a REPL |
| 6 | `text-and-strings` | Text, characters and encodings | Explain strings, indexing and Unicode | characters, code points, UTF-8, escaping, immutability, concatenation vs formatting | Count characters vs bytes in "naïve café"; build a formatted receipt line |

## Module F2 - Control flow and functions (6 lessons)

| # | slug | title | objectives | key concepts | exercise idea |
|---|---|---|---|---|---|
| 7 | `conditionals` | Making decisions | Write correct branching logic | if/else chains, boolean logic, truth tables, short-circuiting, guard clauses | FizzBuzz, then a leap-year checker with test cases |
| 8 | `loops` | Repetition | Choose between counted and conditional loops; avoid off-by-one errors | while, for, ranges, loop invariants, break/continue, infinite loops | Sum the digits of a number; draw a text triangle |
| 9 | `functions` | Functions | Break problems into functions with clear inputs and outputs | parameters vs arguments, return values, side effects, pure functions, call stack | Refactor a 40-line script into 4 functions |
| 10 | `scope-and-lifetime` | Scope and lifetime | Predict which name a reference resolves to | local/global, block vs function scope, shadowing, closures (intro), lifetime | Predict outputs of 6 scope puzzles |
| 11 | `recursion` | Recursion | Write and trace recursive functions | base case, recursive case, stack frames, stack overflow, recursion vs iteration | Factorial, then a recursive directory-size calculator on a nested structure |
| 12 | `errors-and-exceptions` | When things go wrong | Tell error kinds apart and handle them deliberately | syntax vs runtime vs logic errors, exceptions vs error values, fail fast, input validation | Make a calculator robust against bad input |

## Module F3 - Data structures (6 lessons)

| # | slug | title | objectives | key concepts | exercise idea |
|---|---|---|---|---|---|
| 13 | `sequences-and-arrays` | Arrays and lists | Use indexed collections and their operations | arrays vs dynamic arrays, indexing, slicing, iteration, mutability | Reverse a list in place; rotate it by k |
| 14 | `maps-and-sets` | Maps and sets | Choose a map or set for lookup and uniqueness | key/value, hashing (intuition), membership, set operations | Word-frequency counter; remove duplicates while keeping order |
| 15 | `records-and-objects` | Grouping data: records and objects | Model data with records, then objects | structs/records, fields, methods, encapsulation, identity vs equality | Model a library book and a member |
| 16 | `stacks-queues-linked` | Stacks, queues and linked lists | Implement and use the classic linear structures | LIFO/FIFO, deque, nodes and pointers/references | Balanced-brackets checker; a print-queue simulation |
| 17 | `trees-and-graphs` | Trees and graphs | Represent hierarchical and networked data | tree terms, binary search tree, graph adjacency list, BFS/DFS (intro) | Build a family tree; find the shortest path in a small maze |
| 18 | `memory-and-references` | Memory, values and references | Explain copy vs share and when data is freed | stack vs heap, value vs reference semantics, aliasing, shallow vs deep copy, GC vs manual memory | Predict aliasing bugs in 5 snippets |

## Module F4 - Algorithms and complexity (5 lessons)

| # | slug | title | objectives | key concepts | exercise idea |
|---|---|---|---|---|---|
| 19 | `algorithmic-thinking` | Algorithmic thinking | Break a problem into steps before coding | decomposition, pseudocode, worked examples, edge cases | Write pseudocode for making change with the fewest coins |
| 20 | `big-o` | Complexity and Big-O | Estimate time and space growth | Big-O, common classes (O(1) to O(2^n)), best/worst/average case, amortised cost | Rank 8 snippets by complexity; time them at growing n |
| 21 | `searching-and-sorting` | Searching and sorting | Implement linear/binary search and two sorts | binary search, insertion sort, merge sort, stability, built-in sorts | Binary search with tests; compare sorts on 10^5 items |
| 22 | `problem-patterns` | Common problem-solving patterns | Apply standard patterns | two pointers, sliding window, hashing for lookup, divide and conquer, memoisation | Solve 4 small problems, each with a named pattern |
| 23 | `paradigms` | Programming paradigms | Compare imperative, OO, functional and declarative styles | state vs immutability, higher-order functions, objects vs data, SQL as declarative | Solve one task in three styles |

## Module F5 - Working like a programmer (5 lessons)

| # | slug | title | objectives | key concepts | exercise idea |
|---|---|---|---|---|---|
| 24 | `debugging` | Debugging | Find bugs systematically | reproduce, isolate, hypothesise; print debugging, debuggers, breakpoints, rubber duck, reading stack traces | Fix 5 seeded bugs, writing down the hypothesis for each |
| 25 | `testing-mindset` | The testing mindset | Write tests before or alongside code | unit vs integration tests, arrange-act-assert, edge cases, test-driven development (intro), regression tests | Write tests for a provided buggy function until they expose every bug |
| 26 | `version-control` | Version control with Git | Use the basic Git workflow | repository, commit, diff, branch, merge, remote, pull request, .gitignore | Make 5 commits on a branch, merge, resolve one conflict |
| 27 | `reading-docs-and-code` | Reading documentation and other people's code | Find answers in official docs and unfamiliar code | reference vs tutorial docs, version-specific docs, reading signatures, searching a codebase | Answer 5 questions using only official docs |
| 28 | `clean-code-and-security-basics` | Clean code and security basics | Write readable, safer code | naming, small functions, comments vs docs, DRY, never trust input, secrets out of code, dependencies | Refactor a messy script; find 3 security smells |
