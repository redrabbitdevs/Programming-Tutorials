# Node.js docs: Modules: TypeScript (type stripping)

- URL: https://nodejs.org/api/typescript.html (source fetched as https://nodejs.org/api/typescript.md)
- Accessed: 2026-11-13 (docs for the current release line)
- Related: https://nodejs.org/dist/index.json (release list)

## History block (verbatim)

```yaml
changes:
  - version: v26.0.0
    description: Removed `--experimental-transform-types` flag.
  - version: [v25.2.0, v24.12.0]
    description: Type stripping is now stable.
  - version: [v24.3.0, v22.18.0]
    description: Type stripping no longer emits an experimental warning.
  - version: [v23.6.0, v22.18.0]
    description: Type stripping is enabled by default.
  - version: v22.7.0
    description: Added `--experimental-transform-types` flag.
introduced_in: v22.6.0
Stability: 2 - Stable
```

## Key passages (verbatim, trimmed)

- "By default Node.js will execute TypeScript files that contains only erasable TypeScript syntax. Node.js will
  replace TypeScript syntax with whitespace, and no type checking is performed. To disable this feature, use the
  flag `--no-strip-types`."
- "The built-in TypeScript parser requires WebAssembly. If WebAssembly is unavailable, parsing throws `ERR_WEBASSEMBLY_NOT_SUPPORTED`."
- "Node.js ignores `tsconfig.json` files and therefore features that depend on settings within `tsconfig.json`,
  such as paths or converting newer JavaScript syntax to older standards, are intentionally unsupported."
- "Type stripping is compatible with most versions of TypeScript but we recommend version 5.8 or newer with the
  following `tsconfig.json` settings:"

```json
{
  "compilerOptions": {
     "noEmit": true,
     "target": "esnext",
     "module": "nodenext",
     "rewriteRelativeImportExtensions": true,
     "erasableSyntaxOnly": true,
     "verbatimModuleSyntax": true
  }
}
```

- Module system: "`.ts` files will have their module system determined the same way as `.js` files ... `.mts` files
  will always be run as ES modules ... `.cts` files will always be run as CommonJS modules ... `.tsx` files are unsupported."
- "file extensions are mandatory in `import` statements and `import()` expressions: `import './file.ts'`, not `import './file'`."
- "The `tsconfig.json` option `allowImportingTsExtensions` will allow the TypeScript compiler `tsc` to type-check
  files with `import` specifiers that include the `.ts` extension."
- "any TypeScript features that involve _replacing_ TypeScript syntax with new JavaScript syntax will error. The most
  prominent features that require transformation are: `Enum` declarations, `namespace` with runtime code, parameter
  properties, import aliases. `namespace`s that do not contain runtime code are supported."
  Error code: `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`.
- "Since Decorators are currently a TC39 Stage 3 proposal, they are not transformed and will result in a parser error."
  (Note: tc39/proposals README lists Decorators under **Stage 2.7** on 2026-11-13; the Node wording is stale. The
  conclusion, a parser error, holds either way.)
- "the `type` keyword is necessary to correctly strip type imports. Without the `type` keyword, Node.js will treat
  the import as a value import, which will result in a runtime error. The tsconfig option `verbatimModuleSyntax` can
  be used to match this behavior."
- "Type stripping can be enabled for `--eval` and STDIN. The module system will be determined by `--input-type` ...
  TypeScript syntax is unsupported in the REPL, `--check`, and `inspect`."
- "source maps are unnecessary for correct line numbers in stack traces; and Node.js does not generate them."
- "Node.js refuses to handle TypeScript files inside folders under a `node_modules` path."
- "`tsconfig` "paths" won't be transformed and therefore produce an error. The closest feature available is subpath
  imports with the limitation that they need to start with `#`."
- Full support: use a third-party package, e.g. `npx tsx your-file.ts` or `node --import=tsx your-file.ts`.

## Release lines (dist/index.json, newest first, 2026-11-13)

```text
v27.0.0-alpha.0.1.0 2026-11-12  (alpha)
v26.13.1 2026-11-10  LTS "Lithium"   (v26.13.0 2026-10-28 was the first LTS release of 26)
v24.22.3 2026-11-10  LTS
v22.23.5 2026-11-11  LTS "Jod"
```
