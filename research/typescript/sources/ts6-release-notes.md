# TypeScript 6.0 release notes (trimmed)

- URL: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
- Fetched as: https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/documentation/copy/en/release-notes/TypeScript%206.0.md
  (typescriptlang.org itself was blocked: proxy CONNECT 403; this is the page's source file in Microsoft's website repo)
- Accessed: 2026-11-13

## New features (headings and key lines, verbatim)

- "Less Context-Sensitivity on `this`-less Functions": "If `this` is never actually *used* in a function, then it is not considered contextually sensitive." (method-syntax callbacks now infer like arrows)
- "Subpath Imports Starting with `#/`": supported "under the options `nodenext` and `bundler` for the `--moduleResolution` setting."
- "Combining `--moduleResolution bundler` with `--module commonjs`" is now allowed.
- "The `--stableTypeOrdering` Flag": "in 6.0, you can specify the new `--stableTypeOrdering` flag. This makes 6.0's type ordering behavior match 7.0's ... it can add a substantial slowdown to type-checking (up to 25% depending on codebase)." "One of the major architectural improvements in TypeScript 7 is parallel type checking ... TypeScript 7.0 sorts its internal objects (e.g. types and symbols) according to a deterministic algorithm based on the content of the object."
- "`es2025` option for `target` and `lib`": "there are no new JavaScript language features in ES2025, this new target adds new types for built-in APIs (e.g. `RegExp.escape`), and moves a few declarations from `esnext` into `es2025` (e.g. `Promise.try`, `Iterator` methods, and `Set` methods)."
- "New Types for `Temporal`": "via `--target esnext` or `"lib": ["esnext"]` (or the more-granular `esnext.temporal`)."
- "New Types for "upsert" Methods (a.k.a. `getOrInsert`)": "added to the `esnext` lib".
- "`RegExp.escape`": "available in the `es2025` lib".
- "The `dom` lib Now Contains `dom.iterable` and `dom.asynciterable`".

## Breaking changes and deprecations

"TypeScript 6.0 arrives as a significant transition release, designed to prepare developers for TypeScript 7.0 ...
these deprecations can be ignored by setting `"ignoreDeprecations": "6.0"` in your tsconfig; however, note that
TypeScript 7.0 *will not* support any of these deprecated options."

"many projects will need to do at least one of the following: Set the `"types"` array in tsconfig, typically to
`"types": ["node"]` ... Set `"rootDir": "./src"` if you were previously relying on this being inferred"

### Simple Default Changes (verbatim bullets, trimmed)

- "**`strict` is now `true` by default**"
- "**`module` defaults to `esnext`**"
- "**`target` defaults to current-year ES version**: ... (effectively a floating target). Right now, that target is `es2025`."
- "**`noUncheckedSideEffectImports` is now `true` by default**"
- "**`libReplacement` is now `false` by default**"
- "`rootDir` now defaults to `.`": "the default `rootDir` will always be the directory containing the `tsconfig.json` file."
- "`types` now defaults to `[]`": "`"types": ["*"]` will restore the 5.9 behavior".

### Deprecated in 6.0 (removed in 7.0)

- "Deprecated: `target: es5`": "TypeScript's lowest target will now be ES2015"
- "Deprecated: `--downlevelIteration`"
- "Deprecated: `--moduleResolution node` (a.k.a. `--moduleResolution node10`)": migrate to `nodenext` or `bundler`.
- "Deprecated: `amd`, `umd`, and `systemjs` values of `module`" (and `--module none`); "dropped support for the `amd-module` directive".
- "Deprecated: `--baseUrl`": "will no longer be considered a look-up root for module resolution." Put the prefix into each `paths` entry instead.
- "Deprecated: `--moduleResolution classic`"
- "Deprecated: `--esModuleInterop false` and `--allowSyntheticDefaultImports false`": "the safer interop behavior is always enabled."
- "Deprecated: `--alwaysStrict false`": "all code will be assumed to be in JavaScript strict mode".
- "Deprecated: `outFile`": "migrate to an external bundler".
- "Deprecated: legacy `module` Syntax for namespaces": `module Foo {}` is an error; use `namespace Foo {}`. "The ambient module declaration form remains fully supported: `declare module "some-module" { ... }`".
- "Deprecated: `asserts` Keyword on Imports": "Import assertions have been replaced by import attributes. Use 'with' instead of 'asserts'."
- "Deprecated: `no-default-lib` Directives"
- "Specifying Command-Line Files When `tsconfig.json` Exists is Now an Error": "error TS5112 ... Use '--ignoreConfig' to skip this error."

"Preparing for TypeScript 7.0": "options deprecated in TypeScript 6.0 ... will be **removed entirely in TypeScript 7.0** (the native TypeScript port)."
Codemod mentioned: "the experimental `ts5to6` tool (https://github.com/andrewbranch/ts5to6) can automatically adjust `baseUrl` and `rootDir`".
