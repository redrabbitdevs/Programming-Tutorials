# TypeScript fact sheet

Verified 2026-11-13 against primary sources. Cached extracts are in `research/typescript/sources/`.
A tag such as "TS 5.8+" means "added in that TypeScript release". "Node 22" means Node 22.18 or later
(type stripping on by default), the oldest supported line. Compiler and Node behaviour was **tested**
with tsc 7.0.2 and Node 22.23.4, 24.21.0 and 26.11.1: see `sources/probes.md`.

## Blocked hosts (this environment, 2026-11-13)

- **typescriptlang.org** and **devblogs.microsoft.com**: proxy CONNECT refused (403).
- **github.com** and **api.github.com**: 403.
- Substitutes, all published by Microsoft or the Node.js project: release notes and tsconfig reference pages from
  their source files in `microsoft/TypeScript-Website` (raw.githubusercontent.com); `microsoft/TypeScript` and
  `microsoft/typescript-go` repository files (raw.githubusercontent.com); the npm registry; nodejs.org (reachable).
- What this costs: there are **no TypeScript 7.0 release notes** to cite (the devblog post is blocked, and the
  website repo has no `TypeScript 7.0.md`). TS 7 facts below come from the typescript-go README and CHANGES.md,
  the 6.0 release notes' "Preparing for TypeScript 7.0", the 7.0.2 npm package and tsc 7.0.2 itself.
  **Performance claims for TS 7 (for example "10x faster") are left out**: none could be checked.
  TS 7.1 beta exists, but its contents could not be verified, so nothing from it is listed.

## Current state at a glance

| Fact | Value | Source |
|---|---|---|
| Latest stable | **TypeScript 7.0.2, published 2026-07-08** (npm `latest`; still latest on 2026-11-13, no later 7.0.x) | [registry.npmjs.org/typescript](https://registry.npmjs.org/typescript) (`sources/npm-registry.md`) |
| Pre-releases | 7.1.0-beta (2026-10-20); nightly `next` 7.1.0-dev.20261113.1 | same |
| Previous line | **6.0**: 6.0.2 on 2026-03-23, last patch **6.0.3 (2026-04-16)**. The last compiler written in TypeScript/JS. | same |
| Older | 5.9.2 2025-07-31 (5.9.3 2025-09-30); 5.8.2 2025-02-28 | same |
| Versioning | x.y.0 is the beta, x.y.1 the RC, x.y.2 the first stable (6.0.0-beta, 6.0.1-rc, 6.0.2; 7.0.1-rc, 7.0.2) | same |
| Install | `npm install -D typescript`; nightlies `typescript@next` | [TypeScript README](https://github.com/microsoft/TypeScript/blob/main/README.md) |
| Package | `typescript@7.0.2`: `bin: tsc`, `engines.node >=16.20.0`, native compiler in 20 optional per-platform packages `@typescript/typescript-<os>-<arch>`; no install script (`--ignore-scripts` works) | npm registry; local install |
| Node types | `@types/node` 26.6.6 (2026-10-28) is `latest` and also tag `ts7.0` | [registry](https://registry.npmjs.org/@types%2Fnode) |
| Node.js | 26 is Active LTS (26.13.0 on 2026-10-28, now 26.13.1); 24 and 22 are LTS | [dist/index.json](https://nodejs.org/dist/index.json) |
| Teaching baseline | **TypeScript 7.0, Node.js 26**. Mark anything newer than TS 5.0 with its version, because learners will meet 5.x and 6.0 codebases. | Writer guidance |

## TypeScript 7.0: the native (Go) port

| Change | Detail | Source |
|---|---|---|
| Compiler rewritten in **Go** | The port was staged in `microsoft/typescript-go` ("This was the staging repo for the TypeScript 7.0 release during the native port process, which is now completed!") and merged into `microsoft/TypeScript`, whose build now needs Go 1.27 and Node 24. Internal names: "Strada" (JS compiler, up to 6.0) and "Corsa" (Go compiler, 7.0). | [typescript-go README](https://github.com/microsoft/typescript-go/blob/main/README.md), [CHANGES.md](https://github.com/microsoft/typescript-go/blob/main/CHANGES.md), [CONTRIBUTING.md](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) (`sources/typescript-go-and-repo.md`) |
| Same language as 6.0 | README table: "Same types as TS 6.0", "Same errors, locations, and messages as TS 6.0. Types printback in errors may display differently." | typescript-go README |
| Command name | `tsc` again from 7.0 RC (previews used `tsgo` from `@typescript/native-preview`, last published 2026-07-07) | README; npm registry |
| **Parallel type checking** and **deterministic type ordering** | "One of the major architectural improvements in TypeScript 7 is parallel type checking." 7.0 sorts types and symbols by content, so union order is stable (for example always `100 \| 500`). `--stableTypeOrdering` defaults to true in 7.0; in 6.0 it is an opt-in migration aid (up to 25% slower). | [6.0 notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html) (`sources/ts6-release-notes.md`); `tsc --help --all` |
| New CLI flags | `--checkers` (checkers per project), `--builders` (projects built concurrently), `--singleThreaded`, `--pprofDir` | tsc 7.0.2 `--help --all` (`sources/probes.md`) |
| Everything deprecated in 6.0 is **removed** | Errors TS5102/TS5108; `"ignoreDeprecations": "6.0"` no longer helps (tested) | 6.0 notes "Preparing for TypeScript 7.0"; probes |
| **No stable programmatic API yet** | The package's main export only gives `version`; the API lives under `typescript/unstable/*`. README: "API: not ready". Tools that `import ts from "typescript"` for the compiler API must stay on 6.0 for now. | 7.0.2 `package.json` and `lib/version.cjs`; README |
| Language service | README: "in progress. Nearly all features implemented." | typescript-go README |
| JavaScript / JSDoc checking trimmed | Constructor functions (`function C() { this.x = 1 }` + `C.prototype.m`) no longer typed: use classes. Closure-style JSDoc removed (`?` type, `function(string): void`, namepaths, `@class`, `@enum`). `arguments` no longer implies rest params. CommonJS files cannot mix `module.exports =` with `module.exports.x =`. `.d.ts` emit from `.js` changed. | CHANGES.md |
| Checker differences | Conflicting declarations error at every site (some errors hidden by `--skipLibCheck` appear); template-literal inference splits by code point, not UTF-16 unit; with `strict: false`, arguments for `undefined`/`unknown`/`any` parameters can no longer be omitted | CHANGES.md |

## TypeScript 6.0 (2026-03-23): the transition release

"TypeScript 6.0 arrives as a significant transition release, designed to prepare developers for TypeScript 7.0."
API compatible with 5.9. Source: [6.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html).

- New: method-syntax callbacks that never use `this` infer like arrows; subpath imports starting with `#/`
  (`nodenext`, `bundler`); `--moduleResolution bundler` with `--module commonjs`; `target`/`lib` **`es2025`**;
  built-in types for **`Temporal`** (`esnext` / `esnext.temporal`), **`Map.getOrInsert`/`getOrInsertComputed`**
  (`esnext`) and **`RegExp.escape`** (`es2025`); `dom` now includes `dom.iterable` and `dom.asynciterable`.
- `tsc file.ts` in a folder with a `tsconfig.json` is an error (TS5112); use `--ignoreConfig`.

## tsconfig defaults that matter (6.0+ and 7.0)

All tested with tsc 7.0.2 and an empty `tsconfig.json` (`sources/probes.md`), and stated in the 6.0 notes.

| Option | Default now | Before 6.0 | Lesson impact |
|---|---|---|---|
| `strict` | **true** | false | Every lesson is strict unless it says otherwise. |
| `target` | **es2025** (floating "current year") | an older ES version | `lib` follows target, so ES2026/ES2027 APIs (`getOrInsert`, `Temporal`, `Iterator.concat`, `Uint8Array.fromBase64`) need `"lib": ["esnext"]` or `"target": "esnext"`. |
| `module` | `esnext` per the 6.0 notes (`--help` shows "undefined", output is ESM) | depended on target | Node projects should set `"module": "nodenext"` explicitly. |
| `moduleResolution` | `nodenext` if `module` is `nodenext`; `node16` for node16/node18; otherwise `bundler` (tsc 7.0.2 `--help`) | depended on module | `node`/`node10`/`classic` are gone. |
| `types` | **`[]`** | every visible `@types/*` | Node lessons must set `"types": ["node"]` and install `@types/node`. `["*"]` restores the old behaviour. |
| `rootDir` | directory of `tsconfig.json` | inferred common root | Set `"rootDir": "./src"` when emitting from `src/`. |
| `noUncheckedSideEffectImports` | **true** | false (option added 5.6) | `import "./x.css"` needs a declaration. |
| `esModuleInterop`, `allowSyntheticDefaultImports`, `alwaysStrict` | true, and **cannot be set to false** | false | Default-import CommonJS packages: `import express from "express"`. |
| `libReplacement` | false | true (5.8) | - |
| `useDefineForClassFields` | true for ES2022+ | - | Class fields follow ECMAScript semantics. |
| Not on by default | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`, `erasableSyntaxOnly`, `skipLibCheck` | - | `tsc --init` turns all except `erasableSyntaxOnly` on (see below). |

**`tsc --init` (7.0.2)** writes `module: nodenext`, `target: esnext`, `types: []`, `sourceMap`, `declaration`,
`declarationMap`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `strict`, `jsx: react-jsx`,
`verbatimModuleSyntax`, `isolatedModules`, `noUncheckedSideEffectImports`, `moduleDetection: force`, `skipLibCheck`
(the minimal `--init` dates from [5.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html)).

**Course tsconfig for runnable examples** (Node's recommendation plus `types` and `lib`):

```json
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "nodenext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "types": ["node"]
  }
}
```

## Node.js type stripping (running `.ts` directly)

Source: [nodejs.org/api/typescript.html](https://nodejs.org/api/typescript.html) (`sources/node-typescript-docs.md`), and the probe.

| Node version | Status |
|---|---|
| v22.6.0 | Added behind `--experimental-strip-types` |
| v22.7.0 | `--experimental-transform-types` added (enums etc.) |
| **v23.6.0 / v22.18.0** | **On by default** |
| v24.3.0 / v22.18.0 | No experimental warning |
| **v25.2.0 / v24.12.0** | **Stable** (Stability 2). Opt-out renamed `--no-strip-types` (Node 22 still uses `--no-experimental-strip-types`: tested) |
| **v26.0.0** | `--experimental-transform-types` **removed** ("bad option" on 26.11.1) |

Limits (documented and tested on 22.23.4, 24.21.0, 26.11.1):

- **Erasable syntax only.** Node replaces types with whitespace. These throw `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`:
  `enum`, `namespace` with runtime code, constructor **parameter properties**, `import x = require()` /
  `import A = N.B` aliases, and angle-bracket assertions `<T>x` (tested). Type-only `namespace` is fine.
  Decorators are a parse error. `tsc --erasableSyntaxOnly` (5.8+) reports all of these at compile time.
- **No type checking at all.** A type error runs happily. Pair it with `tsc --noEmit`.
- **`tsconfig.json` is ignored**: no `paths`, no downlevelling, no `target`. Use subpath imports (`#...`) instead of `paths`.
- **Type imports need `type`**: `import { fn, type Opts } from "./fn.ts"`. Without it, Node fails at runtime
  ("does not provide an export named"). `verbatimModuleSyntax` makes tsc enforce this.
- **File extensions are mandatory**: `import "./util.ts"`, not `"./util"`. For tsc, set
  `rewriteRelativeImportExtensions` (5.7+) or `allowImportingTsExtensions` (5.0+), or it reports TS5097 (tested).
- `.ts` follows `package.json` `"type"`; `.mts` is always ESM, `.cts` always CommonJS; **`.tsx` unsupported**.
- Not in the REPL, `--check` or `inspect`; works for `--eval` and stdin with `--input-type=module-typescript`.
- Refuses `.ts` under `node_modules` (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`): publish JavaScript plus `.d.ts`.
- Needs WebAssembly; no source maps needed (positions are preserved).
- Node's docs call decorators "Stage 3"; tc39/proposals lists Decorators at **Stage 2.7** (2026-11-13,
  https://github.com/tc39/proposals, matching `research/javascript/facts.md`).

## Language features by version (for minVersion)

From the release notes of each version (`sources/ts5-release-notes.md`, `sources/ts6-release-notes.md`).
Features from before 4.9 (generics, mapped, conditional and template literal types, `unknown`, variadic tuples,
`in`/`out` variance annotations, `override`, `import type`) need no tag beyond the course floor of **TS 5.0**.

| Version | Features worth teaching |
|---|---|
| 4.9 | `satisfies`; `in` narrowing for unlisted properties; `accessor` auto-accessors |
| 5.0 | Standard (TC39-style) decorators; `const` type parameters; `extends` with several configs; all enums are union enums; `--moduleResolution bundler`; `--verbatimModuleSyntax`; `allowImportingTsExtensions`; `export type *`; JSDoc `@satisfies`, `@overload` |
| 5.2 | `using` / `await using` (explicit resource management); decorator metadata; mixed named/anonymous tuple labels |
| 5.3 | Import attributes (`with { type: "json" }`); `switch (true)` narrowing |
| 5.4 | Narrowing preserved in closures after the last assignment; `NoInfer<T>`; `Object.groupBy`/`Map.groupBy` types; `--module preserve` |
| 5.5 | **Inferred type predicates**; narrowing on constant indexed access; JSDoc `@import`; regex syntax checking; `--isolatedDeclarations`; `${configDir}` |
| 5.6 | Errors on always-truthy/nullish checks; iterator helper types; `--strictBuiltinIteratorReturn`; `--noUncheckedSideEffectImports`; `--noCheck` |
| 5.7 | Never-initialized variable checks; `--rewriteRelativeImportExtensions`; `es2024` target |
| 5.8 | **`--erasableSyntaxOnly`**; granular return-expression checks; `require(esm)` under `nodenext`; `--module node18` |
| 5.9 | `import defer * as ns` (only with `--module preserve`/`esnext`; not downlevelled); `--module node20`; minimal `tsc --init` |
| 6.0 | New defaults (above); `es2025`; `Temporal`, `getOrInsert`, `RegExp.escape` types; `#/` subpath imports; `--stableTypeOrdering`; `--ignoreConfig` |
| 7.0 | Native compiler, parallel checking, `--checkers`/`--builders`/`--singleThreaded`; 6.0 deprecations removed |

## Deprecated or removed: do not teach as current

Removal checked against tsc 7.0.2 (`sources/probes.md`).

| Item | Status | Use instead | Source |
|---|---|---|---|
| `--target ES3` | Deprecated 5.0, no effect 5.5, **not a valid value** in 7.0 | `es2015`+ (default `es2025`) | [5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html), [5.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html) notes |
| `--target ES5` | Deprecated 6.0, **removed 7.0** (lowest target is ES2015) | `es2015`+, or another compiler for ES5 | 6.0 notes |
| `importsNotUsedAsValues`, `preserveValueImports` | Deprecated 5.0, no effect 5.5, **unknown option** in 7.0 | `verbatimModuleSyntax` + `import type` | 5.0/5.5 notes; [tsconfig ref](https://www.typescriptlang.org/tsconfig/#importsNotUsedAsValues) |
| `--out`, `--charset`, `--noImplicitUseStrict`, `--keyofStringsOnly`, `--suppressExcessPropertyErrors`, `--suppressImplicitAnyIndexErrors`, `--noStrictGenericChecks`, `prepend` | Deprecated 5.0, gone (unknown option) | - | 5.0/5.5 notes; probes |
| `--outFile` | Removed 6.0/7.0 | a bundler (esbuild, Vite, Rollup) | 6.0 notes |
| `--baseUrl` | Deprecated 6.0, removed 7.0 | prefixed `paths` entries, or subpath imports | 6.0 notes |
| `--moduleResolution node` / `node10` / `classic` | Deprecated 6.0, removed 7.0 | `nodenext` (Node) or `bundler` | 6.0 notes |
| `--module amd` / `umd` / `system` / `none` | Removed 7.0 | `esnext`, `nodenext`, `preserve` | 6.0 notes |
| `--downlevelIteration` | Removed 7.0 (only affected ES5) | - | 6.0 notes |
| `esModuleInterop: false`, `allowSyntheticDefaultImports: false`, `alwaysStrict: false` | Cannot be false in 7.0 | defaults | 6.0 notes |
| `/// <reference no-default-lib="true"/>`, `amd-module` directive | No longer supported | `--noLib`, `--libReplacement` | 6.0 notes |
| `module Foo { }` for namespaces | Error (TS1540) | `namespace Foo {}`; ambient `declare module "pkg" {}` is still fine | 6.0 notes |
| Import **assertions** `assert { type: "json" }` | Error (TS2880) | import attributes `with { type: "json" }` (5.3+) | 6.0 notes |
| `ignoreDeprecations: "5.0"` / `"6.0"` | No longer rescues removed options in 7.0 | fix the config | probes |
| `--experimentalDecorators` (legacy decorators), `emitDecoratorMetadata` | Still supported, but legacy | standard decorators (5.0+); teach legacy only for reading Angular/NestJS-era code | tsc 7.0.2 accepts it |
| `enum`, runtime `namespace`, parameter properties, `import =` | Not deprecated, but **not erasable**: fail under Node type stripping and `--erasableSyntaxOnly` | `as const` objects + union types; ES modules; explicit fields | Node docs; 5.8 notes |
| `<T>x` type assertions | Not deprecated; fails under Node type stripping and `erasableSyntaxOnly` | `x as T` | probes |
| Constructor functions and Closure JSDoc in checked JS | Not typed by TS 7 | classes; TS-style JSDoc | CHANGES.md |
| Node `--experimental-strip-types` / `--experimental-transform-types` | First not needed (default); second removed in Node 26 | plain `node file.ts`; `tsx` or `tsc` for non-erasable code | Node docs |
| `@typescript/native-preview` / `tsgo` | Pre-release only; stopped at 7.0.0-dev.20260707.2 | `typescript@7` (`tsc`) | npm registry |
| `ts-node` | Not checked here: do not name it as the recommended runner | Node type stripping; `tsx` (named in Node's docs) | - |

## Modern tooling (what the course teaches)

Third-party tools are named without version claims except where the npm registry was read.

- **Compiler**: `typescript@7` (`npx tsc`, `tsc --noEmit`, `tsc -b`, `tsc --watch`).
- **Running TypeScript**: `node file.ts` (type stripping, Node 22.18+); `tsx` for full syntax (named in Node's docs;
  npm 4.23.15, 2026-09-20); compile with `tsc` and run JS.
- **Types for Node**: `@types/node` with `"types": ["node"]`.
- **Testing**: `node --test --test-reporter=spec add.test.mts` runs a TypeScript test file through type stripping
  (tested on 22.23.4 and 26.11.1; same erasable-only rule). Pass the file name: a bare `node --test` on Node 22.23.4
  did not pick up `add.test.ts`. Vitest is a common alternative.
- **Lint**: typescript-eslint (not version-checked; its TS 7 support was not verified, because TS 7 has no stable API).
- **Editors**: VS Code's built-in TypeScript support; the TS 7 language service is "nearly" complete per the README.
- **Other runtimes**: Deno and Bun run TypeScript, but their docs were blocked in the JS research; name them only.
