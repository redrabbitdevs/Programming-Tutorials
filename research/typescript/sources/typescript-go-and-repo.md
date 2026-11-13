# TypeScript 7 native port: typescript-go and microsoft/TypeScript repository files

- URLs (all fetched via raw.githubusercontent.com; github.com and api.github.com returned 403):
  - https://github.com/microsoft/typescript-go/blob/main/README.md
  - https://github.com/microsoft/typescript-go/blob/main/CHANGES.md
  - https://github.com/microsoft/TypeScript/blob/main/README.md
  - https://github.com/microsoft/TypeScript/blob/main/package.json
  - https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md
- Accessed: 2026-11-13
- Not reachable: the announcement post https://devblogs.microsoft.com/typescript/typescript-native-port/ and any
  TS 7.0 release-notes page (devblogs.microsoft.com and typescriptlang.org blocked; no `TypeScript 7.0.md` exists
  in the TypeScript-Website repo: 404). No performance numbers are quoted for that reason.

## typescript-go README (verbatim, trimmed)

```text
# This Repo Is Closed
This was the staging repo for the TypeScript 7.0 release during the native port process, which is now completed!
Please continue development and discussion in the original repo (https://github.com/microsoft/TypeScript)
This repo will be permanently archived in September 2026.

## Preview
A preview build is available on npm as `@typescript/native-preview`.
  npm install @typescript/native-preview
  npx tsgo # Use this as you would tsc.
For TypeScript 7.0 RC and later, the command name is `tsc`.
```

Feature table (status as the README still shows it):

```text
Program creation           done  Same files and module resolution as TS 6.0.
Parsing/scanning           done  Exact same syntax errors as TS 6.0
Commandline/tsconfig       done
Type checking              done  Same errors, locations, and messages as TS 6.0. Types printback in errors may display differently.
JS inference and JSDoc     done  Complete, but intentionally lacking some features.
JSX, declaration emit, JS emit, watch mode, build mode / project references, incremental build   done
Language service (LSP)     in progress  Nearly all features implemented.
API                        not ready
```

"For a list of intentional changes with respect to TypeScript 6.0, see CHANGES.md."

## CHANGES.md (verbatim, trimmed)

"CHANGES.md lists intentional changes between the Strada (TypeScript) and Corsa (Go) compilers."
("Strada" = the JavaScript-implemented compiler, up to 6.0; "Corsa" = the Go compiler, 7.0.)

- JavaScript support: "intended to expose TypeScript features in a .js file, working exactly as they do in TypeScript
  with different syntax." "The biggest single removed area is support for Closure header files".
  "One important use of expando declarations is no longer supported: constructor functions ... Use classes instead".
- JSDoc removed: `?` unknown type (use `any`), namepaths `module:file~id` (use `import("file").id`), `@class`/`@constructor`
  constructor functions, Closure `function(string): void` types (use `(s: string) => void`), automatic `typeof` insertion,
  `@enum` (Closure). "`@typedef` and `@callback` in a class body are hoisted outside the class." "`@param` tags now apply to at most one function."
- "`arguments` usage within a JS function body no longer implies a `...args: any[]` parameter".
- CommonJS: "Corsa does not permit CommonJS modules to mix assignments to the full `module.exports` with assignments to `module.exports.xxx` properties."
- Declaration emit from `.js` "has substantially changed behavior".
- Scanner: "Node positions use UTF8 offsets from the beginning of the file, not UTF16 offsets."
- Checker: "In TypeScript 7, conflicting declarations now consistently error in all contributing sites" (some errors
  previously hidden by `--skipLibCheck` now appear). Template literal inference "consumes a full Unicode code point
  rather than a single UTF-16 code unit". "With `"strict": false`, Corsa no longer allows omitting arguments for
  parameters with type `undefined`, `unknown`, or `any`".

## microsoft/TypeScript repository (main) after the merge

- README: "For the latest stable version: `npm install -D typescript`. For our nightly builds: `npm install -D typescript@next`."
- Root package.json: `"name": "@typescript/repo"`, `"engines": { "node": ">=22.18" }`, workspaces `packages/*`,
  devDependency `"typescript": "^6.0.3"` (the repo builds its JS tooling with 6.0), volta node 24.22.2.
- packages/typescript/package.json: `"name": "@typescript/typescript"`, `"bin": { "tsc": "./bin/tsc" }`, `"engines": { "node": ">=16.20.0" }`.
- CONTRIBUTING.md prerequisites: "Go 1.27, Node.js 24, npm ... The repository uses a Go workspace with modules in
  `tsc/` and `tools/`." "npx hereby build  # Build the native compiler into built/local/tsc".
