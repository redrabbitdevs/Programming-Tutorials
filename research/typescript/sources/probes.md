# Local probes: tsc 7.0.2 and Node type stripping

- Date: 2026-11-13
- tsc: `npm install --ignore-scripts typescript@7.0.2 @types/node` in a scratch folder (`tsc --version` = "Version 7.0.2",
  native binary from `@typescript/typescript-linux-x64`).
- Node: system `node` v22.23.4, plus official v24.21.0 and v26.11.1 linux-x64 binaries (scratchpad only).
- These are observations of the released tools, used to confirm the documentation, not to replace it.

## tsc 7.0.2: removed and deprecated options

`tsc --noEmit --ignoreConfig <option> a.ts` (first error line):

```text
--target es3                          TS6046 Argument for '--target' option must be: 'es6', 'es2015', ... 'es2025', 'esnext'.
--target es5                          TS5108 Option 'target=ES5' has been removed. Please remove it from your configuration.
--importsNotUsedAsValues remove       TS5023 Unknown compiler option '--importsNotUsedAsValues'.
--preserveValueImports                TS5023 Unknown compiler option
--keyofStringsOnly / --suppressImplicitAnyIndexErrors / --out / --charset / --noImplicitUseStrict / --prepend
                                      TS5023 Unknown compiler option
--baseUrl . / --outFile / --downlevelIteration
                                      TS5102 Option '<name>' has been removed.
--module amd | umd | system           TS5108 Option 'module=AMD|UMD|System' has been removed.
--module none                         TS6046 (not an allowed value)
--moduleResolution node | node10      TS5108 Option 'moduleResolution=node10' has been removed.
--moduleResolution classic            TS5108 Option 'moduleResolution=Classic' has been removed.
--esModuleInterop false / --allowSyntheticDefaultImports false / --alwaysStrict false
                                      TS5108 Option '<name>=false' has been removed.
--ignoreDeprecations 6.0 --baseUrl .  still TS5102 (ignoreDeprecations does not bring 6.0-deprecated options back)
--experimentalDecorators              accepted (legacy decorators still supported)
```

Note: `tsc --help --all` still lists `--baseUrl`, `--outFile` and `--downlevelIteration`, but using them is an error.

Syntax:

```text
module Foo { ... }                    TS1540 A 'namespace' declaration should not be declared using the 'module' keyword.
import d from "./d.json" assert {...} TS2880 Import assertions have been replaced by import attributes. Use 'with' instead of 'assert'.
tsc file.ts with tsconfig.json present TS5112 tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
```

`--erasableSyntaxOnly` flags each of: `enum`, `namespace` with values, a parameter property, `import fs = require("fs")`,
and the angle-bracket assertion `<number>x` (TS1294 "This syntax is not allowed when 'erasableSyntaxOnly' is enabled.").

## tsc 7.0.2: defaults

`tsc --help --all` (verbatim "default:" lines):

```text
--target         default: es2025      (allowed: es6/es2015 ... es2025, esnext)
--module         default: undefined   (allowed: commonjs, es6/es2015, es2020, es2022, esnext, node16, node18, node20, nodenext, preserve)
--moduleResolution  one of: node16, nodenext, bundler; default: `nodenext` if `module` is `nodenext`; `node16` if `module` is `node16` or `node18`; otherwise, `bundler`.
--strict         default: true
--esModuleInterop default: true
--alwaysStrict   default: true
--stableTypeOrdering default: true
--libReplacement default: false
--isolatedModules default: false
--erasableSyntaxOnly default: false
--rewriteRelativeImportExtensions default: false
--useDefineForClassFields default: `true` for ES2022 and above, including ESNext.
--moduleDetection default: "auto"
```

New TS 7 command-line flags: `--checkers` ("Set the number of checkers per project."), `--builders` ("Set the number
of projects to build concurrently."), `--singleThreaded` ("Run in single threaded mode."), `--pprofDir`.

Empty `tsconfig.json` (`{}`), five files:

```text
implicit.ts  TS7006 Parameter 'x' implicitly has an 'any' type.                 -> strict is on by default
proc.ts      TS2591 Cannot find name 'process'. ... add 'node' to the types field -> types defaults to []
side.ts      TS2882 Cannot find module or type declarations for side-effect import -> noUncheckedSideEffectImports on
libs.ts      getOrInsert / Temporal not found; RegExp.escape OK                  -> default lib = es2025, not esnext
emit.ts      emitted as ESM with class fields kept (`x = 1;`)                     -> ES module output, modern target
exit code 2 (errors, outputs written); with "noEmit": true and errors, exit code 1
```

`tsc --init` (7.0.2) writes, uncommented: `"module": "nodenext"`, `"target": "esnext"`, `"types": []`, `"sourceMap": true`,
`"declaration": true`, `"declarationMap": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`,
`"strict": true`, `"jsx": "react-jsx"`, `"verbatimModuleSyntax": true`, `"isolatedModules": true`,
`"noUncheckedSideEffectImports": true`, `"moduleDetection": "force"`, `"skipLibCheck": true`; commented hints
`"rootDir": "./src"`, `"outDir": "./dist"`, and for Node `"lib": ["esnext"]`, `"types": ["node"]`.

## Type-checking erasable code with tsc 7.0.2

Node's recommended tsconfig (see `node-typescript-docs.md`) plus `"types": ["node"]`, over `.mts` files that import
each other with `.mts` extensions: clean files exit 0; a file with `const bad: number = "x"` gives TS2322 and exit 1.
Without `rewriteRelativeImportExtensions` (or `allowImportingTsExtensions`), `import ... from "./lib.mts"` fails with
TS5097 "An import path can only end with a '.mts' extension when 'allowImportingTsExtensions' is enabled."
`@types/node` needs its dependency `undici-types` installed too.

## Node type stripping (same results on v22.23.4, v24.21.0, v26.11.1)

```text
interfaces, type aliases, generics, `as`, `satisfies`, `!`, abstract/private/readonly/override, `declare const`   runs
enum                       SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]
namespace with a value     SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]
parameter property         SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX] "TypeScript parameter property is not supported in strip-only mode"
<number>x assertion        SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX] "The angle-bracket syntax for type assertions, `<T>expr`, is not supported in type strip mode. Instead, use the 'as' syntax: `expr as T`."
parameter decorator        SyntaxError: Invalid or unexpected token (parse error)
import { k, T } (T a type, no `type` keyword)   SyntaxError: The requested module './lib.mts' does not provide an export named 'T'
import { k, type T }       runs
import "./lib" (no ext)    ERR_MODULE_NOT_FOUND
.ts under node_modules     ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING
.tsx file                  SyntaxError (not stripped)
--input-type=module-typescript with stdin   runs
```

Tests: `node --test --test-reporter=spec add.test.mts` (a `node:test` file with type annotations) prints
`ℹ tests 1 / ℹ pass 1 / ℹ fail 0` on v22.23.4 and v26.11.1. A bare `node --test` in that folder on v22.23.4 did not
find a copy named `add.test.ts` (no summary printed), so name the file explicitly.

Flags:

```text
--no-strip-types                 v26.11.1: accepted (file then fails as plain JS); v22.23.4: "bad option: --no-strip-types"
--no-experimental-strip-types    v22.23.4: accepted (the old spelling)
--experimental-transform-types   v22.23.4: works (enum runs); v26.11.1: "bad option" (removed in v26.0.0)
```
