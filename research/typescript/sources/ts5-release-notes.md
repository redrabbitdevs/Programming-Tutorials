# TypeScript 4.9 to 5.9 release notes (trimmed)

- URLs: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-X-Y.html for 4-9, 5-0 ... 5-9
- Fetched as: https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/documentation/copy/en/release-notes/TypeScript%20X.Y.md
  (typescriptlang.org blocked; these are the page sources in Microsoft's website repo)
- Accessed: 2026-11-13
- Release dates: npm publish time of the first stable (see `npm-registry.md`); only 5.8 and 5.9 were recorded there.

## Feature headings by version (verbatim `##` headings, selected)

- **4.9**: The `satisfies` Operator; Unlisted Property Narrowing with the `in` Operator; Auto-Accessors in Classes; Checks For Equality on `NaN`
- **5.0**: Decorators (standard); `const` Type Parameters; Supporting Multiple Configuration Files in `extends`; All `enum`s Are Union `enum`s; `--moduleResolution bundler`; Resolution Customization Flags (`allowImportingTsExtensions`, `resolvePackageJsonExports`, `resolvePackageJsonImports`, `allowArbitraryExtensions`, `customConditions`); `--verbatimModuleSyntax`; Support for `export type *`; `@satisfies` and `@overload` in JSDoc
- **5.1**: Easier Implicit Returns for `undefined`-Returning Functions; Unrelated Types for Getters and Setters
- **5.2**: `using` Declarations and Explicit Resource Management; Decorator Metadata; Named and Anonymous Tuple Elements; Easier Method Usage for Unions of Arrays
- **5.3**: Import Attributes; `switch (true)` Narrowing; Narrowing On Comparisons to Booleans; `instanceof` Narrowing Through `Symbol.hasInstance`
- **5.4**: Preserved Narrowing in Closures Following Last Assignments; The `NoInfer` Utility Type; `Object.groupBy` and `Map.groupBy`; Support for `require()` calls in `--moduleResolution bundler` and `--module preserve` ("when using `--module preserve`, the `bundler` option will be implicitly set for `--moduleResolution`")
- **5.5**: Inferred Type Predicates; Control Flow Narrowing for Constant Indexed Accesses; The JSDoc `@import` Tag; Regular Expression Syntax Checking; Isolated Declarations; The `${configDir}` Template Variable
- **5.6**: Disallowed Nullish and Truthy Checks; Iterator Helper Methods; `--strictBuiltinIteratorReturn`; Support for Arbitrary Module Identifiers; `--noUncheckedSideEffectImports`; `--noCheck`; Allow `--build` with Intermediate Errors
- **5.7**: Checks for Never-Initialized Variables; Path Rewriting for Relative Paths (`--rewriteRelativeImportExtensions`); `--target es2024`; Support for V8 Compile Caching in Node.js
- **5.8**: Granular Checks for Branches in Return Expressions; `require()` of ECMAScript Modules in `--module nodenext`; `--module node18`; The `--erasableSyntaxOnly` Option; The `--libReplacement` Flag
- **5.9**: Minimal and Updated `tsc --init`; Support for `import defer`; Support for `--module node20`

## 5.0: deprecations (verbatim)

"In TypeScript 5.0, we've deprecated the following settings and setting values:
`--target: ES3`, `--out`, `--noImplicitUseStrict`, `--keyofStringsOnly`, `--suppressExcessPropertyErrors`,
`--suppressImplicitAnyIndexErrors`, `--noStrictGenericChecks`, `--charset`, `--importsNotUsedAsValues`,
`--preserveValueImports`, `prepend` in project references. These configurations will continue to be allowed until
TypeScript 5.5, at which point they will be removed entirely".
Also: "`--newLine` ... the new default setting is `LF`"; "`--forceConsistentCasingInFileNames` ... now defaults to `true`".

## 5.5: "Disabling Features Deprecated in TypeScript 5.0" (verbatim)

"In TypeScript 5.5, these options no longer have any effect. To help with a smooth upgrade path, you may still
specify them in your tsconfig, but these will be an error to specify in TypeScript 6.0."

## 5.8: `--erasableSyntaxOnly` (verbatim, trimmed)

"constructs like the following are not supported: `enum` declarations; `namespace`s and `module`s with runtime code;
parameter properties in classes; Non-ECMAScript `import =` and `export =` assignments ...
TypeScript 5.8 introduces the `--erasableSyntaxOnly` flag. When this flag is enabled, TypeScript will error on most
TypeScript-specific constructs that have runtime behavior ... Typically, you will want to combine this flag with the
`--verbatimModuleSyntax`".

## 5.9: `import defer` (verbatim, trimmed)

"The syntax only permits namespace imports: `import defer * as feature from "./some-feature.js";` ...
`import defer` is not transformed or "downleveled" at all by TypeScript ... will only work under the `--module`
modes `preserve` and `esnext`."
`--module node20`: "intended to model the behavior of Node.js v20 ... specifying `--module node20` will imply
`--target es2023` ... `--module nodenext`, on the other hand, implies the floating `--target esnext`."

## tsconfig reference pages (same repo, packages/tsconfig-reference/copy/en/options/)

- `importsNotUsedAsValues.md`: "Deprecated in favor of `verbatimModuleSyntax`."
- `types.md`: "By default `types` is set to `[]`. For versions below TypeScript 6.0, by default all _visible_ "`@types`" packages are included in your compilation."
- `strict.md`: "Future versions of TypeScript may introduce additional stricter checking under this flag".
- `target.md`: "The special `ESNext` value refers to the highest version your version of TypeScript supports."
- `noCheck.md`: "Disable full type checking (only critical parse and emit errors will be reported)."
- `isolatedDeclarations.md`: "Require sufficient annotation on exports so other tools can trivially generate declaration files."
