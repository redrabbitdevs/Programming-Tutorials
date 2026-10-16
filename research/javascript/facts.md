# JavaScript fact sheet

Verified 2026-10-14 against primary sources. Cached extracts are in `research/javascript/sources/`.
A tag such as "ES2025+ / Node 24+" means "in that spec edition, and runnable from that Node.js major onward".
Node support was **tested**, not inferred: see `sources/node-feature-probe.md`.

## Blocked hosts (this environment, 2026-10-14)

tc39.es, 262.ecma-international.org, ecma-international.org, web.dev, v8.dev, deno.com, docs.deno.com,
bun.sh, bun.com, typescriptlang.org (proxy CONNECT refused), and github.com / api.github.com (403).
Substitutes, all published by the same projects: spec and proposal sources from raw.githubusercontent.com
(tc39/ecma262, tc39/proposals, nodejs/Release, denoland/deno, oven-sh/bun); Baseline data from the
`web-features` npm package; runtime versions from each project's npm package. nodejs.org and
developer.mozilla.org were reachable directly.

## Current state at a glance

| Fact | Value | Source |
|---|---|---|
| Latest ECMAScript edition | **ECMAScript 2026, the 17th edition** of ECMA-262 | `es2026/spec.html` in tc39/ecma262: "It is the seventeenth edition" (`sources/ecma262-es2026-edition.md`) |
| ES2026 approval date | Not verified (ecma-international.org blocked). Editions are normally approved at the June Ecma GA. | - |
| Next edition | ES2027 (18th edition) is the living draft at https://tc39.es/ecma262/ | `main/spec.html` title |
| Node.js Current | **v26.12.0**, 2026-10-14 (V8 14.6, npm 11.20.0); v26.11.1 2026-10-07 is the version the examples are tested on; v26.0.0 on 2026-05-05 | [previous releases](https://nodejs.org/en/about/previous-releases), [dist index](https://nodejs.org/dist/index.json) (`sources/node-releases.md`) |
| Node.js Active LTS | **v24 "Krypton"**, latest v24.21.0 (2026-09-07); moves to Maintenance 2026-10-20; EOL 2028-04-30 | [schedule.json](https://github.com/nodejs/Release/blob/main/schedule.json) |
| Node.js Maintenance LTS | **v22 "Jod"**, latest v22.23.3 (2026-09-23); EOL 2027-04-30 | schedule.json |
| Next LTS | **v26 becomes LTS on 2026-10-28** (two weeks after this sheet); EOL 2029-04-30 | schedule.json, [v26.0.0 post](https://nodejs.org/en/blog/release/v26.0.0) |
| End of life | v20 "Iron" (EOL 2026-04-30), v25 (EOL 2026-06-01), v23, v21, v18 | schedule.json |
| New Node release model | "Starting with Node.js 27, the release cycle will be annual and every major version will move to LTS status after its six-month Current phase (and six additional months of Alpha phase)." v27 alpha 2026-10-28, Current 2027-04-22. | previous-releases page |
| Deno | **2.9.7**, 2026-09-16 | [Releases.md](https://github.com/denoland/deno/blob/main/Releases.md) (`sources/other-runtimes-typescript.md`) |
| Bun | **1.4.3**, 2026-10-10 | oven-sh/bun `LATEST` file; npm `bun` |
| TypeScript | **7.0.2**, 2026-07-08 (6.0 on 2026-03-23) | npm `typescript` |
| Installed here | `node --version` = **v22.22.0** (Maintenance LTS). Node 24.21.0 and 26.11.1 official binaries were downloaded to the scratchpad only, for the probe. | local run |
| Teaching baseline | **ES2026 language, Node.js 26 LTS** for examples. Mark anything that needs Node 24+ or 26+ with its minimum, because many learners will have Node 22 or 24. | Writer guidance |

## Spec features by edition (with Node and browser status)

Stage-4 dates and "Expected Publication Year" are from [finished-proposals.md](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md);
edition contents are from the ES2026 introduction. Baseline is from `web-features` 3.42.0 (2026-10-09) and MDN banners
(`sources/baseline-web-features.md`). "Node" is the oldest **current** line (22/24/26) where the probe found it.

### Stage 4, expected in ES2027 (not in ES2026; already in the ES2027 draft unless noted)

| Feature | Stage 4 | Node | Baseline | Teach? |
|---|---|---|---|---|
| **Temporal** (`Temporal.PlainDate`, `ZonedDateTime`, `Instant`, `Duration`...) | 2026-05 | **26+** (enabled by default in 26.0.0) | Not Baseline: Chrome/Edge 144, Firefox 139, no Safari (MDN: "Limited availability") | Yes, as ES2027 / Node 26+. Spec text not yet merged into the draft on 2026-10-14. |
| **Explicit resource management**: `using`, `await using`, `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack` | 2026-05 | **24+** | Not Baseline: Chrome 134, Firefox 141, no Safari | Yes, as ES2027 / Node 24+ |
| Joint iteration `Iterator.zip`, `Iterator.zipKeyed` | 2026-05 | none yet | Not Baseline | Mention only |
| Iterator chunking (`chunks`, `windows`), `Iterator.prototype.includes`, `Iterator.prototype.join` (stage 4 2026-09) | 2026-05/09 | none yet | Not Baseline | Mention only |
| `Atomics.pause` | 2026-05 | 24+ | Baseline 2025 (newly) | Expert only |

### ES2026 (17th edition)

| Feature | Stage 4 | Node | Baseline |
|---|---|---|---|
| `Map.prototype.getOrInsert` / `getOrInsertComputed` (and on `WeakMap`), proposal "Upsert" | 2026-01 | **26+** | Newly available 2026-02-14 |
| `Iterator.concat` | 2025-11 | **26+** | Newly available 2026-03-24 |
| `JSON.parse` reviver `context.source`, `JSON.rawJSON`, `JSON.isRawJSON` | 2025-11 | 22+ | Newly available 2025-03-31 |
| `Uint8Array.fromBase64`/`fromHex`, `toBase64`/`toHex`, `setFromBase64`/`setFromHex` | 2025-07 | **26+** | Newly available 2025-09-05 |
| `Math.sumPrecise` | 2025-07 | **not in any Node release** (Node 26 = V8 14.6; Chrome added it in 147) | Newly available 2026-04-10 (MDN "Baseline 2026") |
| `Error.isError` | 2025-05 | 24+ | **Not Baseline** (no Safari) |
| `Array.fromAsync` | 2025-05 | 22+ | Widely available since 2026-07-25 |

### ES2025 (16th edition)

| Feature | Node | Baseline |
|---|---|---|
| Iterator helpers: `Iterator` global, `Iterator.from`, `.map/.filter/.take/.drop/.flatMap/.reduce/.toArray/.forEach/.some/.every/.find` | 22+ | Newly available 2025-03-31 |
| Set methods: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom` | 22+ | Newly available 2024-06-11 |
| Import attributes `import x from "./a.json" with { type: "json" }` and **JSON modules** | 22+ | Newly available 2025-04-29 (MDN "Baseline 2025") |
| `Promise.try` | 24+ | Newly available 2025-01-07 |
| `RegExp.escape` | 24+ | Newly available 2025-05-01 |
| RegExp modifiers `(?i:...)`; duplicate named capture groups | 24+ | - |
| `Float16Array`, `Math.f16round`, `DataView` `get/setFloat16` | 24+ | Newly available 2025-04-04 |

### ES2024 and earlier (all fine on Node 22+)

- **ES2024**: `Object.groupBy`/`Map.groupBy`, `Promise.withResolvers` (both widely available 2026-09-05), RegExp `v` flag, resizable/transferable `ArrayBuffer`, `String.prototype.isWellFormed`/`toWellFormed`, `Atomics.waitAsync`.
- **ES2023**: `toSorted`, `toReversed`, `toSpliced`, `with`, `findLast`, `findLastIndex`; hashbang `#!`; symbols as WeakMap keys.
- **ES2022**: top-level `await`, public/private class fields and methods, `static` blocks, `#x in obj`, RegExp `/d`, `Error` `cause`, `.at()`, `Object.hasOwn`.
- **ES2021**: `replaceAll`, `Promise.any`, `AggregateError`, `??=`/`&&=`/`||=`, `WeakRef`/`FinalizationRegistry`, numeric separators `1_000`.
- **ES2020**: `BigInt`, dynamic `import()`, `globalThis`, `??`, `?.`, `Promise.allSettled`, `import.meta`, `matchAll`.
- **ES2015-ES2019**: `let`/`const`, arrows, classes, modules, promises, destructuring, spread, template literals, `Map`/`Set`, generators, `Proxy`/`Reflect`, `**`, `includes`, async functions (2017), async iteration and object spread (2018), `flat`/`flatMap`, `Object.fromEntries`, optional catch binding (2019).

### Not standard yet: do not teach as JavaScript

| Proposal | Stage (2026-10-14) | Note |
|---|---|---|
| **Decorators** (and decorator metadata) | **2.7** | Not Stage 3. No engine in the probe parses `@dec`. TypeScript and Babel implement their own versions; cover them in the TypeScript track. |
| Import defer (`import defer * as ns`), source phase imports, Import Text | 3 | Mention in the modules lesson as "coming" at most. |
| ShadowRealm, Immutable ArrayBuffers | 2.7 | - |
| Pipeline operator `\|>`, Async Context, Records and Tuples-style ideas, `throw` expressions, `Math.clamp`, async iterator helpers | 2 or below | Do not teach. |

## Node.js platform status (from the v26.11.1 API docs, `sources/node-api-docs.md`)

| Topic | Status | Version facts |
|---|---|---|
| ES modules | Stable. `.mjs`, or `"type": "module"` in package.json. Top-level `await` in ESM. | - |
| **`require(esm)`** | **No longer experimental since v25.4.0.** Unflagged in v23.0.0 / v22.12.0 / v20.19.0; no warning by default from v23.5.0 / v22.13.0. Throws `ERR_REQUIRE_ASYNC_MODULE` if the module graph uses top-level `await`. | [modules.html](https://nodejs.org/api/modules.html) |
| **Type stripping** (run `.ts` directly) | **Stable** from v25.2.0 / v24.12.0. On by default since v23.6.0 / v22.18.0. Erasable syntax only: `enum`, runtime `namespace`, parameter properties and import aliases throw. No type checking; `tsconfig.json` ignored; `.ts` under `node_modules` refused. | [typescript.html](https://nodejs.org/api/typescript.html) |
| `--experimental-strip-types` | **Obsolete**: stripping is the default. The opt-out was renamed `--no-experimental-strip-types` to **`--no-strip-types`** (v25.2.0 / v24.12.0). `--experimental-transform-types` was **removed in v26.0.0**. | [cli.html](https://nodejs.org/api/cli.html) |
| **Test runner** `node:test`, `node --test` | **Stable since v20.0.0**. `describe`/`it`, subtests, mocking, `MockTimers` (stable v23.1.0), snapshot tests (stable v23.4.0 / v22.13.0), watch mode, coverage (`--experimental-test-coverage`, still flagged as experimental). Tags and `testTagFilters` added in v26.2.0. | [test.html](https://nodejs.org/api/test.html) |
| **Permission model** `--permission` | **Stable since v23.5.0 / v22.13.0** (added v20.0.0). Enforce mode, or audit mode with `--permission-audit`. Grants: `--allow-fs-read`, `--allow-fs-write`, `--allow-net`, `--allow-child-process`, `--allow-worker`, `--allow-addons`, `--allow-wasi`, `--allow-ffi`. | [permissions.html](https://nodejs.org/api/permissions.html) |
| **`fetch`** (global) | **Stable since v21.0.0**; unflagged since v18.0.0. Implemented by Undici (8.0 in Node 26). | [globals.html](https://nodejs.org/api/globals.html) |
| `WebSocket` (global client) | Stable since v22.4.0 | globals.html |
| `--watch` | Stable since v22.0.0 / v20.13.0 | cli.html |
| `--env-file` | Stable since v24.10.0 / v22.21.0 | cli.html |
| `node --run <script>` | Added v22.0.0 | cli.html |
| Temporal | On by default in Node 26 | v26.0.0 release post |

## Deprecated or removed: do not teach as current

| Item | Status | Use instead | Source |
|---|---|---|---|
| `var` | Not deprecated, but superseded | `const` by default, `let` when reassigned | ES2015 |
| `with` statement | MDN: Deprecated; SyntaxError in strict mode (and so in every module and class body) | Destructuring or a temporary variable | `sources/deprecations.md` |
| `arguments.callee`, `arguments` in general | `callee` deprecated (MDN), throws in strict mode | Named function expressions; rest parameters `...args` | MDN |
| `Object.prototype.__proto__` | Deprecated (MDN) | `Object.getPrototypeOf`, `Object.setPrototypeOf`, `Object.create` | MDN |
| `String.prototype.substr` | Deprecated (MDN) | `slice`, `substring` | MDN |
| `escape()` / `unescape()` | Deprecated (MDN) | `encodeURIComponent` / `decodeURIComponent` | MDN |
| `Date.prototype.getYear` | Deprecated (MDN) | `getFullYear` | MDN |
| `import ... assert { type: "json" }` | Non-standard (MDN): replaced by `with` | `with { type: "json" }` | MDN import attributes page |
| Legacy `Date` for new date logic | Not deprecated, but superseded by Temporal (Node 26+, not Baseline) | `Temporal`, still teach `Date` for interop and browsers | v26.0.0 post, MDN |
| Node `new Buffer()` / `Buffer()` | DEP0005 deprecated | `Buffer.from`, `Buffer.alloc` | [deprecations](https://nodejs.org/api/deprecations.html) |
| Node `url.parse()` | DEP0169, insecure | WHATWG `new URL()` | deprecations |
| Node `punycode` | DEP0040 | userland package | deprecations |
| Node `module.register()` | DEP0205, runtime-deprecated in v26 | `module.registerHooks()` | deprecations, v26.0.0 post |
| Node `--experimental-transform-types` | Removed in v26.0.0 | erasable-only TS, or a tool such as `tsx`/`tsc` | v26.0.0 post |
| Node `--experimental-strip-types` / `--experimental-require-module` / `--experimental-fetch` | Not needed: the features are on by default | nothing | cli.html, modules.html, globals.html |
| Node 20 and older | End of life | Node 24 or 26 | schedule.json |
| Decorators as "a JS feature" | Stage 2.7 only | TypeScript track | tc39/proposals |

## TypeScript (pointer only)

TypeScript is a separate tier-1 track. JavaScript lessons may show that Node runs **erasable** TypeScript
directly (type stripping, Node 22.18+/24.12+ stable), and that types are erased, not checked. They link
to the TypeScript track for everything else. Current npm release: 7.0.2 (2026-07-08). Node's docs recommend
TypeScript 5.8+ with `erasableSyntaxOnly` and `verbatimModuleSyntax` for type stripping.

## Other runtimes (brief)

- **Deno 2.9.7** (2026-09-16) and **Bun 1.4.3** (2026-10-10). Their feature claims (permissions, TypeScript handling,
  npm compatibility, built-in tools) could not be checked against deno.com or bun.sh (blocked), so lessons should
  name them as alternatives only, without feature details, until those docs are cached.
- The course teaches **Node.js** as the reference runtime. Examples should be plain ES modules that also run on Deno and Bun where possible; do not claim Deno or Bun feature support without checking their own docs (blocked here).

## Modern tooling (what the course teaches)

Third-party tools are named without version claims; check their changelogs before quoting one.

- **Package managers**: `npm` (bundled with Node; 11.20.0 ships with Node 26.11.1 per dist/index.json), `pnpm`, `yarn`. Lock files, `package.json` `"type"`, `"exports"`, `"imports"` (subpath imports), `npm ci`.
- **Running scripts**: `node file.mjs`, `node --run script`, `node --watch`, `node --env-file=.env`.
- **Testing**: `node:test` + `node:assert/strict` (built in; the course default). Vitest and Jest are common alternatives.
- **Lint and format**: ESLint (flat config), Prettier; Biome as an all-in-one alternative.
- **Bundlers and dev servers**: Vite, esbuild, Rollup. Browser code can also use native modules plus import maps (Baseline widely available).
- **Types**: JSDoc + `// @ts-check`, or TypeScript (separate track).
- **Supply chain**: `npm audit`, lock files, `npm ci`, provenance (`npm publish --provenance`), `--ignore-scripts`; Node permission model.
