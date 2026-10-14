# JavaScript curriculum outline

- Target: **ECMAScript 2026** language, **Node.js 26** (LTS from 2026-10-28) as the reference runtime.
  See `research/javascript/facts.md`.
- **minVersion** is written `ESyyyy / Node NN`: the spec edition that defines the newest feature the lesson
  uses, and the oldest Node.js line that runs the lesson's code as written (tested in
  `sources/node-feature-probe.md`). Node 22 is the oldest supported line (Maintenance LTS until 2027-04-30),
  so "Node 22" means "every supported Node". Lessons that need Node 24 or 26 must say so on the page.
  Features from ES2027 (Temporal, `using`) are marked `ES2027` even though that edition is still a draft:
  both are stage 4.
- `[F:slug]` marks a concept taught in the shared fundamentals track (`research/fundamentals/outline.md`,
  lessons in `site/src/content/lessons/fundamentals/`). The JS lesson links to that fundamentals lesson and
  covers only JavaScript syntax, semantics and pitfalls. It must not re-teach the concept.
- **115 lessons in 20 modules: Beginner 40, Intermediate 38, Advanced 22, Expert 15.** The B7 browser
  strand (5 lessons) is optional, so the Node-only path is 110 lessons.
- Browser and DOM material is an **optional strand** (module B6 and parts of A4). Every other lesson runs on
  Node with `node file.mjs`, so its examples can be validated in CI.
- Do not teach the items in facts.md "Deprecated or removed" or "Not standard yet" as current practice.
  In particular: decorators are Stage 2.7, `Math.sumPrecise` is in no Node release yet, and Temporal is
  not Baseline (no Safari).

Columns: slug | title | objectives | key concepts | minVersion | exercise idea

---

## Beginner (40 lessons)

Assumes fundamentals modules F1 to F3 (programs, types, variables, control flow, functions, scope,
recursion, arrays, maps). Teaches how JavaScript does those things and where it surprises people.

### Module B1 - Getting started with JavaScript (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `what-is-javascript` | JavaScript, ECMAScript and runtimes | Explain the spec/engine/runtime split and where JS runs | ECMA-262 and yearly editions (ES2026 is the 17th), TC39 stages 0 to 4, engines (V8, SpiderMonkey, JavaScriptCore), runtimes (browsers, Node, Deno, Bun), what a program is [F:what-is-a-program] | ES2015 / Node 22 | Match 8 facts to spec, engine or runtime |
| `install-node` | Installing Node.js | Install Node 26 (or 24 LTS) and check versions | nodejs.org installers, a version manager, `node --version`, `npm --version`, LTS vs Current, the new annual release line from Node 27, terminals [F:tools-of-the-trade] | ES2015 / Node 22 | Install Node, print `process.version` and `process.versions.v8` |
| `repl-and-files` | The REPL, scripts and the browser console | Run code in the REPL, from a file and in DevTools | `node` REPL, `.exit`, `node file.mjs`, `--watch` (stable 22), browser console, stdout/stderr [F:tools-of-the-trade] | ES2015 / Node 22 | Same calculation in REPL, file and browser console |
| `console-and-output` | console.log and friends | Produce and format output | `console.log/error/table`, template literals for output, `process.stdout.write`, reading a line with `node:readline/promises` | ES2015 / Node 22 | Greeting program that asks for a name and a year |
| `syntax-style-strict` | Syntax, semicolons, comments and strict mode | Write readable JS and know what strict mode changes | statements vs expressions, ASI pitfalls, `//` and `/* */`, naming (camelCase), modules are always strict, `"use strict"` in scripts, Prettier/ESLint preview | ES2015 / Node 22 | Fix 6 ASI and style bugs in a messy file |

### Module B2 - Values, types and coercion (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `primitives-and-typeof` | Primitive types and typeof | Name the 7 primitives and the object type | `undefined`, `null`, boolean, number, bigint, string, symbol, `typeof` quirks (`typeof null`), dynamic and weak typing [F:values-and-types] | ES2020 / Node 22 | Predict `typeof` for 15 values |
| `numbers-js` | Numbers and BigInt | Use doubles safely and switch to BigInt when needed | IEEE 754 doubles, float imprecision [F:expressions-and-operators], `NaN`, `Infinity`, `-0`, `Number.isNaN`, `Number.isSafeInteger`, `1_000` separators (ES2021), `**`, `BigInt` `123n` (ES2020), `Math` | ES2021 / Node 22 | Money: integer cents vs float; factorial with BigInt |
| `strings-js` | Strings and template literals | Build, slice and search strings | immutability, UTF-16 code units, `length` surprises with emoji, template literals, `at`, `slice`, `includes`, `split`/`join`, `replaceAll` (ES2021), `padStart`, `trim`; text and encodings [F:text-and-strings] | ES2022 / Node 22 | Format a receipt line; count emoji vs `length` |
| `coercion` | Type coercion | Predict implicit conversions | `+` with strings, `ToNumber`/`ToString`/`ToPrimitive` in plain words, explicit `Number()`, `String()`, `Boolean()`, `parseInt` radix, truthy and falsy values | ES2015 / Node 22 | Coercion quiz: 12 expressions, then verify |
| `equality` | Equality: ===, == and Object.is | Choose the right equality check | strict vs loose equality, the `==` table, `NaN !== NaN`, `Object.is`, reference equality for objects, identity vs equality [F:records-and-objects] | ES2015 / Node 22 | Rewrite 8 `==` checks safely |
| `null-undefined-nullish` | null, undefined, ?? and ?. | Handle missing values | `undefined` vs `null`, `??` and `?.` (ES2020), `??=`/`\|\|=`/`&&=` (ES2021), default values vs falsy pitfalls (`0`, `""`) | ES2021 / Node 22 | Read nested config with defaults |

### Module B3 - Variables and control flow (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `let-const` | let, const and block scope | Declare variables the modern way | `const` by default, `let` for reassignment, block scope, temporal dead zone, `const` is not immutability, `var` and hoisting as legacy, variables [F:variables-and-assignment] | ES2015 / Node 22 | Fix 5 bugs caused by `var` in loops |
| `conditionals-js` | if, switch and the conditional operator | Branch in idiomatic JS | conditionals [F:conditionals], `? :`, `switch` with fall-through and `break`, guard clauses, short-circuit `&&`/`\|\|` | ES2015 / Node 22 | Leap-year checker and a grade calculator |
| `loops-js` | Loops: for, while, for...of | Pick the right loop | loops [F:loops], classic `for`, `while`, `do...while`, `for...of` over iterables, `for...in` over keys (and why to avoid it on arrays), `break`/`continue`, labels | ES2015 / Node 22 | Number-guessing game; multiplication table |
| `errors-basics-js` | throw, try, catch and finally | Raise and handle errors | errors [F:errors-and-exceptions], `throw new Error()`, built-in error types, optional catch binding (ES2019), `finally`, `cause` (ES2022) | ES2022 / Node 22 | Robust input-to-number converter |
| `debugging-js` | Debugging JavaScript | Find bugs with DevTools and the Node inspector | debugging [F:debugging], stack traces, `console.*`, `debugger;`, `node --inspect`, breakpoints in VS Code or Chrome DevTools | ES2015 / Node 22 | Fix 4 seeded bugs, writing each hypothesis |

### Module B4 - Functions (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `function-forms` | Declarations, expressions and arrows | Write functions in all three forms | functions [F:functions], declaration hoisting, function expressions, arrow functions, implicit return, functions as values | ES2015 / Node 22 | Temperature converters in 3 styles |
| `parameters-js` | Parameters: defaults, rest and spread | Use every parameter feature | default parameters, rest `...args` (instead of `arguments`), spread in calls, destructured parameters, named-options objects | ES2018 / Node 22 | Flexible `formatName({ first, last, upper })` |
| `scope-closures` | Scope and closures | Explain and use closures | lexical scope, scope [F:scope-and-lifetime], closures over `let` in loops, private state via closure, module scope | ES2015 / Node 22 | Counter factory; fix a closure-in-loop bug |
| `higher-order-functions` | Higher-order functions and callbacks | Pass and return functions | callbacks, functions returning functions, `map`/`filter`/`reduce` preview, partial application, paradigms [F:paradigms] | ES2015 / Node 22 | Build `once` and `debounce` (with fake timers in tests later) |
| `recursion-js` | Recursion in JavaScript | Write recursive functions and know JS limits | recursion [F:recursion], call stack size, `RangeError: Maximum call stack size exceeded`, no tail calls in practice | ES2015 / Node 22 | Recursive nested-array sum and object-tree walk |
| `this-basics` | this (first look) | Predict `this` in the four common cases | method call, plain call (undefined in strict mode), arrow functions capture `this`, losing `this` in callbacks, `bind` | ES2015 / Node 22 | Fix 5 lost-`this` bugs |

### Module B5 - Arrays, objects and data (8)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `arrays-js` | Arrays | Create and change arrays | arrays [F:sequences-and-arrays], `push`/`pop`/`shift`/`unshift`/`splice`, `at` (ES2022), `includes`, `indexOf`, holes, `length` | ES2022 / Node 22 | Todo list manager |
| `array-methods` | map, filter, reduce and friends | Transform arrays declaratively | `map`, `filter`, `reduce`, `find`/`findLast` (ES2023), `some`/`every`, `flat`/`flatMap`, chaining | ES2023 / Node 22 | Report from an array of orders |
| `copying-arrays` | Sorting and non-mutating copies | Avoid accidental mutation | `sort` mutates and compares strings by default, comparator functions, `toSorted`/`toReversed`/`toSpliced`/`with` (ES2023), stable sort, sorting [F:searching-and-sorting] | ES2023 / Node 22 | Sort records by several keys without mutating |
| `objects-js` | Objects | Model data with objects | object literals, shorthand properties, computed keys, dot vs bracket access, `in`, `Object.hasOwn` (ES2022), `delete`, `Object.keys/values/entries`, records [F:records-and-objects] | ES2022 / Node 22 | Model a library book and member |
| `destructuring-spread` | Destructuring, spread and rest | Unpack and combine data | array and object destructuring, defaults, renaming, object spread (ES2018), shallow copies, references [F:memory-and-references] | ES2018 / Node 22 | Merge user settings over defaults |
| `copies-and-references` | References, copies and structuredClone | Predict aliasing and copy deeply | value vs reference, shallow copy with spread, `structuredClone` (Baseline widely available), `Object.freeze` (shallow) | ES2018 / Node 22 | Find 5 aliasing bugs |
| `map-and-set` | Map and Set | Choose Map/Set over plain objects | maps and sets [F:maps-and-sets], `Map` keys of any type, iteration order, `Set` methods `union`/`intersection`/`difference` (ES2025), `Object.groupBy`/`Map.groupBy` (ES2024) | ES2025 / Node 22 | Word-frequency counter; common friends |
| `json-js` | JSON | Parse and produce JSON | `JSON.parse` with a reviver, `JSON.stringify` with indent and replacer, what JSON cannot represent (`undefined`, `BigInt`, `Date`), round-trip pitfalls | ES2015 / Node 22 | Load, edit and save a settings object |

### Module B6 - Modules and a first project (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `es-modules` | ES modules: import and export | Split code into modules | named and default exports, `import`/`export`, `.mjs` and `"type": "module"`, module scope, strict by default, live bindings | ES2015 / Node 22 | Split a script into 3 modules |
| `package-json-npm` | package.json and npm basics | Start a project and add a dependency | `npm init`, `dependencies` vs `devDependencies`, semver ranges, `package-lock.json`, `npm ci`, `npm run`, `node --run` | ES2015 / Node 22 | Create a project with one dependency and one script |
| `json-modules-dynamic-import` | JSON modules, dynamic import and top-level await | Load data and code at runtime | `import data from "./x.json" with { type: "json" }` (ES2025), `import()` (ES2020), top-level `await` (ES2022), `import.meta.url`, `import.meta.dirname` | ES2025 / Node 22 | Load a JSON config; lazily import a plugin |
| `commonjs-awareness` | CommonJS in the wild | Read older Node code and interoperate | `require`/`module.exports`, why ESM is the default to write, `require(esm)` (stable since Node 25.4; unflagged 22.12+), `createRequire` | ES2015 / Node 22 | Convert a small CJS module to ESM |
| `project-cli-quiz` | Project: a command-line quiz | Combine the beginner material | modules, arrays of objects, JSON data, input loop, error handling | ES2025 / Node 22 | Build and extend a quiz game |

### Module B7 - DOM basics (optional browser strand) (5)

Validation note: these examples run in a browser, not in Node. See "Examples plan".

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `script-tags-modules` | JavaScript in a web page | Load scripts correctly | `<script type="module">`, `defer`, DevTools console, the global object vs module scope | ES2015 / browser Baseline | Hello page with a module script |
| `dom-select-change` | Selecting and changing elements | Read and update the DOM | `document.querySelector(All)`, `textContent` vs `innerHTML` (XSS risk), attributes, `classList`, creating elements | ES2015 / browser Baseline | Render a list from an array |
| `dom-events` | Events | Respond to the user | `addEventListener`, event object, bubbling and delegation, `preventDefault`, `{ once, signal }` options | ES2015 / browser Baseline | Click counter; delegated todo list |
| `forms-and-validation` | Forms | Read and validate form input | `FormData`, `input`/`submit` events, constraint validation, never trusting client-side checks [F:clean-code-and-security-basics] | ES2015 / browser Baseline | Sign-up form with live validation |
| `project-todo-page` | Project: a todo page | Combine DOM, events and storage | state in an array, render function, `localStorage` with `try/catch`, modules | ES2023 / browser Baseline | Todo app with filters |

---

## Intermediate (38 lessons)

### Module I1 - Objects, prototypes and classes (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `this-in-depth` | this, call, apply and bind | Control `this` explicitly | the four binding rules, `call`/`apply`/`bind`, arrows in class fields, `globalThis` (ES2020) | ES2020 / Node 22 | Implement a simplified `bind` |
| `prototypes` | Prototypes and the prototype chain | Explain property lookup | `[[Prototype]]`, `Object.create`, `Object.getPrototypeOf` (not `__proto__`), own vs inherited properties, shadowing | ES2015 / Node 22 | Draw and verify the chain of an array |
| `classes` | Classes | Write classes the modern way | `class`, `constructor`, methods, class fields (ES2022), `static`, getters/setters, classes as sugar over prototypes | ES2022 / Node 22 | Bank account class |
| `private-and-static` | Private members and static blocks | Encapsulate state | `#private` fields and methods, `#x in obj` brand checks, `static` blocks (ES2022), encapsulation [F:records-and-objects] | ES2022 / Node 22 | Rewrite a closure-based module as a class with private fields |
| `inheritance-composition` | Inheritance vs composition | Choose between `extends` and composition | `extends`, `super`, subclassing built-ins (`Error`, `Array`), mixins, composition over inheritance | ES2022 / Node 22 | Shape hierarchy, then a composed version |
| `property-descriptors` | Property attributes and immutability | Control writability and enumeration | `Object.defineProperty`, descriptors, `freeze`/`seal`/`preventExtensions`, getters | ES2015 / Node 22 | Read-only config object |
| `symbols` | Symbols | Use symbols for keys and protocols | `Symbol()`, `Symbol.for`, well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`), symbols as WeakMap keys (ES2023) | ES2023 / Node 22 | Custom `toPrimitive` for a Money type |

### Module I2 - Iteration and collections (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `iteration-protocol` | Iterables and iterators | Make any object iterable | iterator protocol, `Symbol.iterator`, `for...of`, spread of iterables, `Array.from` | ES2015 / Node 22 | Iterable `Range` class |
| `generators` | Generators | Produce sequences lazily | `function*`, `yield`, `yield*`, infinite sequences, `return`/`throw` on generators | ES2015 / Node 22 | Fibonacci generator; tree walker with `yield*` |
| `iterator-helpers` | Iterator helpers | Process lazy sequences | `Iterator.from`, `.map/.filter/.take/.drop/.flatMap/.reduce/.toArray` (ES2025), `Iterator.concat` (ES2026, Node 26), laziness vs array methods; `zip`/`chunks`/`join` are ES2027 with no Node support yet | ES2026 / Node 26 | First 10 primes from an infinite generator |
| `maps-sets-in-depth` | Map, Set and upsert | Use Map/Set idiomatically | Set methods (ES2025), `Map.prototype.getOrInsert`/`getOrInsertComputed` (ES2026, Node 26), grouping, Map vs object performance [F:big-o] | ES2026 / Node 26 | Group log lines by level with `getOrInsert` |
| `weak-collections` | WeakMap, WeakSet and WeakRef | Attach data without leaking memory | `WeakMap`/`WeakSet`, `WeakRef`/`FinalizationRegistry` (ES2021) and why to avoid relying on them, GC [F:memory-and-references] | ES2023 / Node 22 | Cache metadata for objects with a WeakMap |
| `data-structures-js` | Stacks, queues, trees and graphs in JS | Implement classic structures idiomatically | arrays as stacks, queue pitfalls with `shift`, linked nodes, trees and graphs [F:stacks-queues-linked] [F:trees-and-graphs], BFS with a Map | ES2022 / Node 22 | Balanced brackets; shortest path in a grid |

### Module I3 - Asynchronous JavaScript (8)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `event-loop` | The event loop | Explain how one thread handles many tasks | call stack, task queue, microtask queue, `setTimeout(…, 0)` vs `queueMicrotask` vs promise callbacks, run-to-completion, blocking the loop | ES2015 / Node 22 | Predict the output order of 8 log statements |
| `callbacks` | Callbacks and their problems | Read callback-style code | error-first callbacks in Node, callback nesting, inversion of control, `util.promisify` | ES2015 / Node 22 | Promisify a callback API |
| `promises` | Promises | Create and chain promises | states, `then`/`catch`/`finally`, chaining and returning, `new Promise`, `Promise.withResolvers` (ES2024), `Promise.try` (ES2025, Node 24) | ES2025 / Node 24 | Wrap `setTimeout` as `sleep`; chain 3 steps |
| `async-await` | async and await | Write async code that reads like sync code | `async` functions, `await`, `try/catch` with `await`, top-level `await` in modules, sequential vs parallel awaits | ES2022 / Node 22 | Rewrite a promise chain with async/await |
| `promise-combinators` | Running promises together | Choose the right combinator | `Promise.all`, `allSettled` (ES2020), `any` (ES2021), `race`, `AggregateError`, limiting concurrency | ES2021 / Node 22 | Fetch 5 mock resources with a concurrency limit of 2 |
| `async-errors` | Error handling in async code | Never lose an error | unhandled rejections (Node exits by default), floating promises, `cause`, `Error.isError` (ES2026, Node 24), retry with backoff | ES2026 / Node 24 | Add retries and error causes to a flaky task |
| `cancellation` | Timeouts and cancellation | Cancel async work | `AbortController`, `AbortSignal.timeout`, `AbortSignal.any`, passing `signal` to `fetch` and timers (`node:timers/promises`) | ES2022 / Node 22 | Cancellable search with a timeout |
| `async-iteration` | Async iteration | Consume streams of async values | `for await...of`, async generators (ES2018), `Array.fromAsync` (ES2026, Node 22), paginated APIs | ES2026 / Node 22 | Read all pages of a mock paginated API |

### Module I4 - Text, patterns, dates and numbers (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `regex-basics` | Regular expressions | Match and extract text | literals and `RegExp`, flags `g i m s u`, `test`, `match`, `matchAll` (ES2020), `replace` with functions | ES2020 / Node 22 | Extract dates and emails from text |
| `regex-advanced` | Named groups, lookaround and the v flag | Write maintainable patterns | named groups, lookbehind (ES2018), `/d` indices (ES2022), `/v` flag (ES2024), inline modifiers `(?i:...)` (ES2025, Node 24), `RegExp.escape` (ES2025, Node 24) | ES2025 / Node 24 | Safe search-and-highlight using `RegExp.escape` |
| `unicode-js` | Unicode in JavaScript strings | Handle emoji and accents correctly | code points vs UTF-16 units, `for...of` over code points, `normalize`, `isWellFormed`/`toWellFormed` (ES2024), `Intl.Segmenter` for graphemes, encodings [F:text-and-strings] | ES2024 / Node 22 | Correct "first character" and length for emoji |
| `intl-formatting` | Intl: numbers, dates, lists and plurals | Format for a locale | `Intl.NumberFormat`, `DateTimeFormat`, `ListFormat`, `PluralRules`, `RelativeTimeFormat`, `toLocaleString` | ES2020 / Node 22 | Localised receipt in 3 locales |
| `dates-legacy` | Date (the legacy API) | Read and use `Date` safely | epoch milliseconds, months from 0, local vs UTC, ISO strings, why `Date` is error-prone; `getYear` deprecated | ES2015 / Node 22 | Days between two dates, and find the DST bug |
| `temporal` | Temporal | Use the modern date-time API | `Temporal.Now`, `PlainDate`, `PlainDateTime`, `ZonedDateTime`, `Instant`, `Duration`, immutability, time zones; stage 4 (2026-05), ES2027, Node 26 only, not Baseline (no Safari) | ES2027 / Node 26 | Meeting planner across 3 time zones |

### Module I5 - Node.js essentials (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `node-runtime` | The Node.js runtime | Know what Node adds to JS | `node:` built-in modules, `process` (`argv`, `env`, `exit`, `exitCode`), `globalThis` in Node, Web APIs in Node (`fetch`, `URL`, `AbortController`), `--env-file` (stable 24.10) | ES2022 / Node 22 | Print a summary of the environment |
| `files-and-paths` | Files and paths | Read and write files safely | `node:fs/promises`, `readFile`/`writeFile`, `node:path`, `import.meta.dirname`, `URL` paths, directories, errors like `ENOENT` | ES2022 / Node 22 | Word count over a folder of text files |
| `cli-tools` | Writing command-line tools | Build a real CLI | `util.parseArgs`, stdin/stdout, exit codes [F:tools-of-the-trade], shebang `#!` (ES2023), `"bin"` in package.json | ES2023 / Node 22 | `grep`-like tool with flags |
| `streams-intro` | Streams | Process data that does not fit in memory | readable/writable/transform, `pipeline` from `node:stream/promises`, async iteration of streams, web streams | ES2018 / Node 22 | Line counter over a large file with constant memory |
| `http-and-fetch` | HTTP: fetch and a small server | Call APIs and serve requests | global `fetch` (stable since Node 21), `Response`, JSON bodies, status codes, `node:http` `createServer`, `WebSocket` client (stable 22.4) | ES2022 / Node 22 | Weather CLI against a local mock server |
| `npm-in-depth` | npm, semver and lock files | Manage dependencies deliberately | semver, `^`/`~`, lock files, `npm ci`, `npx`, scripts, workspaces, `"exports"` and `"imports"` (subpath imports) | ES2015 / Node 22 | Add, update and audit dependencies in a small app |

### Module I6 - Testing and tooling (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `node-test` | Testing with node:test | Write and run unit tests | testing [F:testing-mindset], `node:test` (stable since Node 20), `describe`/`it`, `node:assert/strict`, `node --test`, watch mode | ES2022 / Node 22 | Tests that expose every bug in a buggy function |
| `mocks-and-fake-timers` | Mocks, spies and fake timers | Test code with time and side effects | `mock.fn`, `mock.method`, `mock.timers` (added 20.4, stable 23.1), snapshot tests (stable 23.4 / 22.13) | ES2022 / Node 22 | Test the `debounce` from B4 with fake timers |
| `lint-format` | Linting and formatting | Automate style and catch bugs early | ESLint flat config, Prettier, editor integration, common rules (`no-unused-vars`, `eqeqeq`) | ES2022 / Node 22 | Lint and fix a messy project |
| `types-for-js` | Types for JavaScript code | Get type checking without leaving JS | JSDoc types and `// @ts-check`, Node type stripping runs erasable `.ts` files (on by default 22.18+, stable 24.12 / 25.2; no type checking), pointer to the TypeScript track | ES2022 / Node 22 | Add JSDoc types and fix the errors the checker finds |
| `project-rest-client` | Project: a tested API client | Combine async, Node and testing | `fetch`, retries, cancellation, `node:test`, a local mock server | ES2026 / Node 24 | Build and test a client for a mock REST API |

---

## Advanced (22 lessons)

### Module A1 - Metaprogramming and functional patterns (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `proxy-reflect` | Proxy and Reflect | Intercept object operations | traps, `Reflect`, invariants, validation and observable objects, cost of proxies | ES2015 / Node 22 | Validating model object with a Proxy |
| `tagged-templates` | Tagged templates | Build DSLs and safe string builders | tag functions, `strings.raw`, `String.raw`, escaping for HTML/SQL | ES2015 / Node 22 | `html` tag that escapes values |
| `functional-patterns` | Functional patterns | Write composable code | purity, immutability, `compose`/`pipe` by hand (the pipeline operator is Stage 2, do not use), memoisation [F:problem-patterns], currying | ES2023 / Node 22 | Memoised, composed data pipeline |
| `decorators-status` | Decorators: status and alternatives | Know what is and is not JavaScript | Stage 2.7 (not standard), TypeScript/Babel decorators belong to toolchains, higher-order functions and wrappers as the JS way | ES2022 / Node 22 | Implement `@logged` behaviour as a wrapper function |
| `realms-and-eval` | eval, Function and code loading | Know the risks of dynamic code | `eval` (direct vs indirect), `new Function`, CSP, `node:vm` is not a security boundary, ShadowRealm is Stage 2.7 | ES2015 / Node 22 | Replace an `eval`-based config loader with JSON |

### Module A2 - Resources and concurrency (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `using-declarations` | using and explicit resource management | Release resources deterministically | `using`, `await using`, `Symbol.dispose`/`asyncDispose`, `DisposableStack`, `AsyncDisposableStack`; stage 4 (2026-05), ES2027, Node 24+, not Baseline (no Safari) | ES2027 / Node 24 | File handle and temp directory cleaned up with `using` |
| `async-patterns` | Advanced async patterns | Control concurrency and backpressure | queues, semaphores, pools, rate limiting, `Promise.withResolvers` for deferreds, avoiding unbounded `Promise.all` | ES2024 / Node 22 | Download queue with concurrency 3 and retries |
| `worker-threads` | Worker threads and Web Workers | Run CPU work in parallel | `node:worker_threads`, `postMessage`, structured clone, transferables, Web Workers in browsers | ES2022 / Node 22 | Parallel prime counting with a worker pool |
| `shared-memory-atomics` | SharedArrayBuffer and Atomics | Share memory safely | `SharedArrayBuffer`, `Atomics.wait`/`notify`/`waitAsync` (ES2024), `Atomics.pause` (ES2027, Node 24), data races, cross-origin isolation in browsers | ES2024 / Node 22 | Shared counter, with and without Atomics |
| `streams-advanced` | Streams in depth | Build stream pipelines with backpressure | Node streams vs WHATWG streams, `Readable.from`, async generators as transforms, backpressure, `stream/promises` | ES2018 / Node 22 | CSV-to-JSON transform over a large file |
| `child-processes` | Child processes | Run and talk to other programs | `execFile` vs `spawn`, why not to pass user input with `shell: true` (DEP0190), exit codes, streams | ES2022 / Node 22 | Run `git log` and parse the output |

### Module A3 - Binary data and encoding (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `arraybuffer-typedarrays` | ArrayBuffer and typed arrays | Work with raw bytes | `ArrayBuffer`, `Uint8Array` and friends, `DataView`, endianness, resizable and transferable buffers (ES2024) | ES2024 / Node 22 | Parse a BMP or WAV header |
| `float16` | Float16Array | Use half-precision floats | `Float16Array`, `Math.f16round`, `DataView` `getFloat16`/`setFloat16` (ES2025, Node 24), precision loss | ES2025 / Node 24 | Compare float64, float32 and float16 rounding |
| `base64-hex` | Base64 and hex | Encode bytes as text | `Uint8Array.fromBase64`/`toBase64`/`fromHex`/`toHex` (ES2026, Node 26), `TextEncoder`/`TextDecoder`, Node `Buffer` as the older alternative (not `new Buffer`) | ES2026 / Node 26 | Encode and decode a file in base64 and hex |
| `json-advanced` | JSON in depth | Handle big numbers and custom types | reviver `context.source` and `JSON.rawJSON` (ES2026, Node 22), BigInt round-trips, `toJSON`, streaming JSON | ES2026 / Node 22 | Round-trip 64-bit IDs without precision loss |
| `math-precision` | Numeric precision | Choose a strategy for exact arithmetic | float error [F:expressions-and-operators], BigInt, scaled integers, `Math.sumPrecise` (ES2026; Baseline 2026 in browsers but in no Node release yet, so show it as browser-only) | ES2026 / Node 22 | Sum money exactly three ways |

### Module A4 - Building and shipping (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `package-authoring` | Writing a package | Publish a correct, modern package | `"exports"` and conditional exports, ESM-only vs dual packages, `require(esm)` reducing the need for dual builds, `"files"`, `"engines"` | ES2022 / Node 22 | Publish a tiny library to a local registry or `npm pack` |
| `bundlers` | Bundlers and dev servers | Build browser apps | why bundle, Vite, esbuild, tree shaking, source maps, import maps without a bundler (Baseline widely available) | ES2022 / browser Baseline | Build a small app with and without a bundler |
| `browser-platform` | The browser platform in depth (optional strand) | Use modern Web APIs | `fetch` in the browser, CORS, storage options, `<dialog>`, Web Workers, Baseline and how to read it | ES2022 / browser Baseline | Offline-capable notes page |
| `compatibility-baseline` | Compatibility: Baseline, polyfills and transpiling | Decide what syntax and APIs you can ship | Baseline (newly vs widely available), MDN compat tables, feature detection, polyfills vs transpiling, `engines` field | ES2026 / Node 22 | Audit a codebase for features newer than your targets |
| `testing-at-scale` | Testing at scale | Keep a large codebase correct | coverage (`--experimental-test-coverage`), test isolation, integration tests with a real server, property-based testing (fast-check), CI | ES2022 / Node 22 | Add coverage and an integration test suite |
| `project-fullstack` | Project: a small full-stack app | Combine Node, browser and tooling | HTTP API with `node:http`, browser client, shared ESM code, tests, linting | ES2025 / Node 22 | Build a link shortener |

---

## Expert (15 lessons)

Expert lessons that describe V8 internals must cite v8.dev or V8 source, which were blocked during this
research. **Re-verify every engine claim before writing.** Node 26.0.0 release notes confirm V8 14.6 and that
Maglev exists ("build: enable maglev for Linux on s390x").

### Module E1 - Engine internals (V8) (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `engine-pipeline` | How V8 runs your code | Describe parsing, bytecode and tiered compilation | parsing and lazy parsing, Ignition bytecode, tiers (Sparkplug, Maglev, TurboFan) at a high level, `process.versions.v8`, what a program is [F:what-is-a-program] | ES2015 / Node 22 | Observe warm-up with a micro-benchmark |
| `shapes-inline-caches` | Hidden classes and inline caches | Write shape-stable code | hidden classes (maps), monomorphic vs polymorphic call sites, adding properties in constructors, `delete` cost | ES2022 / Node 22 | Compare stable vs unstable object shapes |
| `garbage-collection` | Garbage collection in V8 | Explain generational GC and its costs | young/old generations, allocation rate, `--max-old-space-size`, weak references, GC [F:memory-and-references] | ES2021 / Node 22 | Measure allocation-heavy vs reuse versions |
| `memory-leaks` | Finding memory leaks | Diagnose leaks with heap snapshots | heap snapshots in DevTools, `--heap-prof` (stable 22.4), closures and listeners as leak sources, `WeakMap` fixes | ES2022 / Node 22 | Find the leak in a long-running server |
| `webassembly-interop` | WebAssembly from JavaScript | Call Wasm from JS | `WebAssembly.instantiate`, memory sharing, when Wasm helps and when it does not | ES2022 / Node 22 | Call a provided Wasm function from Node and the browser |

### Module E2 - Performance (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `measuring-performance` | Measuring performance | Benchmark without fooling yourself | `performance.now`, `node:perf_hooks`, warm-up and JIT effects, statistics, Big-O first [F:big-o] | ES2022 / Node 22 | Benchmark 3 implementations properly |
| `profiling-node` | Profiling Node.js | Find hot spots | `--cpu-prof` (stable 22.4), `--inspect` with DevTools, flame graphs, event-loop delay (`monitorEventLoopDelay`) | ES2022 / Node 22 | Profile and fix a slow JSON endpoint |
| `event-loop-performance` | Keeping the event loop responsive | Avoid blocking | long tasks, chunking work, `setImmediate`, worker offloading, browser main-thread budget | ES2022 / Node 22 | Make a CPU-heavy endpoint stay responsive |
| `startup-snapshots-cache` | Startup: compile cache and snapshots | Make CLIs start fast | `NODE_COMPILE_CACHE`, startup snapshots (`--build-snapshot`, no longer experimental 25.4 / 24.13.1), single executable applications (`--experimental-sea-config`) | ES2022 / Node 22 | Halve a CLI's startup time |
| `data-oriented-js` | Allocation-aware and data-oriented code | Cut allocation and GC pressure in hot paths | object pools, typed arrays for numeric data, avoiding hidden intermediate arrays, iterator helpers vs array chains, measuring before and after | ES2025 / Node 22 | Rewrite a particle simulation to use typed arrays |

### Module E3 - Security and the supply chain (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `js-security-bugs` | Security bugs specific to JavaScript | Prevent injection and prototype pollution | XSS (`innerHTML`, `textContent`), prototype pollution and `Object.create(null)`/`Map`, `--disable-proto`, ReDoS, command injection (`shell: true`), never trust input [F:clean-code-and-security-basics] | ES2022 / Node 22 | Find and fix 5 vulnerabilities in a small app |
| `node-permission-model` | Sandboxing Node with the permission model | Run code with least privilege | `--permission` (stable since 23.5 / 22.13), `--allow-fs-read`/`--allow-fs-write`/`--allow-net`/`--allow-child-process`, `--permission-audit`, `process.permission.has`, limits of the model | ES2022 / Node 22 | Lock down a script to one directory and no network |
| `supply-chain` | The npm supply chain | Reduce dependency risk | lock files and `npm ci`, `npm audit`, install scripts and `--ignore-scripts`, typosquatting, provenance, minimal dependencies, updating safely | ES2022 / Node 22 | Audit and harden a project's dependency tree |
| `crypto-and-secrets` | Cryptography and secrets | Use the platform crypto correctly | Web Crypto (`crypto.subtle`, `crypto.randomUUID`, `getRandomValues`), `node:crypto`, never `Math.random` for secrets, password hashing (`scrypt`), secrets out of code and `--env-file` | ES2022 / Node 22 | Hash and verify passwords; sign and verify a token |
| `security-review-project` | Project: security review | Review and harden a real app | threat model, dependency audit, permission flags, input validation, CSP for the browser part | ES2022 / Node 22 | Produce a review and fixes for the A4 full-stack app |

---

## Counts

- Beginner 40 (B1 5, B2 6, B3 5, B4 6, B5 8, B6 5, B7 5; 35 Node + 5 optional browser).
- Intermediate 38 (I1 7, I2 6, I3 8, I4 6, I5 6, I6 5).
- Advanced 22 (A1 5, A2 6, A3 5, A4 6).
- Expert 15 (E1 5, E2 5, E3 5).
- **Total 115 lessons in 20 modules**, every module 5 to 8 lessons.

---

## Examples plan (validation proposal; no scripts changed)

Mirror the Python pipeline in `scripts/validate.sh`, step 2.

1. **Layout**: `examples/javascript/<level>/<lesson-slug>/<name>.mjs` with a sibling `<name>.out` (expected
   stdout) and optional `<name>.in` (stdin). Use `.mjs` so every file is an ES module whatever the nearest
   `package.json` says.
2. **Runner**: for each `*.mjs` that is not a test file, run `cd "$dir" && timeout 30 "${NODE:-node}" name.mjs < stdin_file`
   and compare stdout with `.out` byte for byte, exactly like the Python loop. A non-zero exit is a failure
   unless the example has a `.out` and is meant to fail (same rule as the unittest case).
   Set `NO_COLOR=1` and `FORCE_COLOR=0` so `console.log` of objects prints without ANSI colours.
3. **Tests**: `*.test.mjs` run with `node --test --test-reporter=spec name.test.mjs`. Normalise durations
   (`/\(\d+(\.\d+)?ms\)/` to `(0.1ms)`) and the `duration_ms` summary line before comparing, as the Python
   script normalises `Ran N tests in X.XXXs`.
4. **Paths**: strip the example's absolute directory from output (stack traces print `file:///…/name.mjs`).
   Strip both the plain path and the `file://` URL form.
5. **Browser strand (B7, parts of A4)**: these cannot run in Node. Put them under `examples/javascript/browser/`
   and only syntax-check them with `node --check file.mjs` (works for module syntax without running it).
   DOM behaviour is checked by hand.
6. **Version gating**: frontmatter `minVersion` holds both parts, for example `ES2027 / Node 26`. The example
   runner does not skip anything; it runs everything on the pinned Node. `check_versions.py` should learn the
   JS format so that a lesson using Temporal, `Iterator.concat`, `getOrInsert` or base64 methods cannot claim
   less than Node 26, and `using`, `Promise.try`, `RegExp.escape`, `Float16Array`, `Error.isError` cannot
   claim less than Node 24. The probe in `sources/node-feature-probe.md` is the reference table.
7. **Never in examples**: `Math.sumPrecise` (no Node release has it), decorators (Stage 2.7), `Iterator.zip`,
   `chunks`, `includes`, `join` (no engine in Node yet).
8. **CI pin**: add a separate `actions/setup-node` step for examples with **`node-version: 26.11.1`** (exact,
   for reproducible output), and pass `NODE=$(which node)` to `validate.sh`. Node 26 becomes Active LTS on
   2026-10-28 and is the only line with Temporal, `Iterator.concat`, `getOrInsert` and base64/hex. The site
   build currently uses Node 22 (`.github/workflows/ci.yml`, `deploy.yml`); it can stay on 22 or move to 26
   separately. Optional second job: run the subset of examples whose `minVersion` says Node 22 on Node 22, to
   prove the minimum claims.
9. **Local machine**: Node **v22.22.0** is installed here (`node --version`). It runs Node-22 examples, but
   Node 24/26 examples (Temporal, `using`, base64) will fail locally until a Node 26 binary is installed,
   so the `NODE=/path/to/node26` override (like `PYTHON=`) is required for a full local run.
