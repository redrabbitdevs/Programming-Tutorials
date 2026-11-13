# TypeScript curriculum outline

- Target: **TypeScript 7.0** (7.0.2, 2026-07-08) as the compiler, **Node.js 26** (Active LTS) as the runtime.
  See `research/typescript/facts.md`.
- **Prerequisite: the JavaScript track.** This track does not re-teach JavaScript. `[JS:slug]` marks a lesson in
  `research/javascript/outline.md` (lessons in `site/src/content/lessons/javascript/`) that the TS lesson links to and
  builds on; the TS lesson covers only the types. `[F:slug]` marks a shared fundamentals lesson, as in the JS outline.
- **minVersion** is written `TS x.y / Node NN`: the TypeScript release that added the newest feature or default the
  lesson relies on, and the oldest Node line that runs the lesson's examples by type stripping. **TS 5.0** is the
  floor (everything older needs no tag). **TS 6.0** marks lessons that rely on the 6.0 defaults (`strict` on,
  `types: []`, `target: es2025`). **Node 22** means 22.18+ (stripping on by default), so "every supported Node".
  Node 26 is needed only where the JavaScript itself needs it (Temporal, `getOrInsert`, base64 methods, per
  `research/javascript/sources/node-feature-probe.md`). In lesson frontmatter, `minVersion` holds the TS number
  (for example `"5.8"`), and the Node minimum is stated on the page when it is above 22.
- **101 lessons in 19 modules: Beginner 32, Intermediate 33, Advanced 21, Expert 15.** Every module has 5 to 8 lessons.
- **Erasable-first.** Every runnable example is erasable TypeScript, so it runs with plain `node file.ts` and also
  type-checks under `tsc --noEmit` with `erasableSyntaxOnly`. Non-erasable features (`enum`, runtime `namespace`,
  parameter properties, `import =`, `<T>x` assertions, decorators) are taught in their own lessons (I3
  `enum-alternatives`, A2, A4 `non-erasable-features`) with examples that are type-checked only. See "Examples plan".
- Do not teach the items in facts.md "Deprecated or removed" as current. In particular: no `target: es5`/`es3`,
  `baseUrl`, `moduleResolution: node`, `outFile`, `importsNotUsedAsValues`, `module Foo {}`, `assert {}` imports,
  and no `ts-node` as the default runner.

Columns: slug | title | objectives | key concepts | minVersion | exercise idea

---

## Beginner (32 lessons)

Assumes the JavaScript Beginner level (modules B1 to B6) and the shared fundamentals F1 to F3.

### Module B1 - Getting started with TypeScript (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `what-is-typescript` | TypeScript: JavaScript with types | Explain what TS adds and what it never changes | static types over JS [JS:what-is-javascript], types are erased, structural typing preview, `tsc` checks and emits, TS 7 is a native (Go) compiler, the 6.0 to 7.0 transition, static vs dynamic typing [F:values-and-types] | TS 5.0 / Node 22 | Sort 10 statements into "runtime" or "compile time" |
| `install-typescript` | Installing TypeScript | Add `typescript` to a project and run `tsc` | `npm install -D typescript`, `npx tsc --version`, per-project not global, native binary packages, `@types/node` [JS:package-json-npm] | TS 7.0 / Node 22 | Create a project and print the compiler version |
| `running-typescript` | Running TypeScript: type stripping vs compiling | Run `.ts` with Node and check it with `tsc` | `node file.ts` (on by default 22.18, stable 24.12/25.2), no type checking at run time, `tsc --noEmit`, erasable syntax only, `.ts`/`.mts`/`.cts`, `tsx` as the full-syntax runner | TS 5.8 / Node 22 | Run a file with a type error: Node runs it, `tsc` rejects it |
| `tsconfig-first-look` | tsconfig.json basics | Read and write a minimal config | `tsc --init` (minimal since 5.9), the 6.0 defaults (`strict`, `types: []`, `target: es2025`), the course config (`module: nodenext`, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `types: ["node"]`), `tsc file.ts` vs `-p` (TS5112, `--ignoreConfig`) | TS 6.0 / Node 22 | Fix a config that fails with "Cannot find name 'process'" |
| `reading-errors` | Reading compiler errors and using the editor | Turn an error message into a fix | error codes (TS2322, TS2345, TS7006), hover, go to definition, quick fixes, `// @ts-expect-error` vs `// @ts-ignore`, debugging [F:debugging] | TS 5.0 / Node 22 | Fix 8 seeded errors, naming each error code |

### Module B2 - Basic types (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `annotations-and-inference` | Type annotations and inference | Know when to annotate and when to let TS infer | `: Type`, inference from initialisers, return-type inference, widening `let` vs `const` [JS:let-const], annotate boundaries | TS 5.0 / Node 22 | Remove every redundant annotation from a file |
| `primitive-types` | Primitive types | Type JS primitives | `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined` [JS:primitives-and-typeof], wrapper types `String` vs `string` | TS 5.0 / Node 22 | Type a unit-converter module |
| `arrays-and-tuples` | Arrays and tuples | Type lists and fixed-length records | `T[]` vs `Array<T>`, `readonly T[]`, tuples, optional and rest elements, labelled tuples (5.2 mixed labels) [JS:arrays-js] | TS 5.2 / Node 22 | Return `[min, max]` from a function as a labelled tuple |
| `object-types` | Object types | Describe object shapes | inline object types, optional `?`, `readonly`, excess property checks, structural typing [JS:objects-js] [F:records-and-objects] | TS 5.0 / Node 22 | Type a book and a library member, then trigger an excess-property error |
| `any-unknown-never` | any, unknown and never | Choose the safe top and bottom types | `any` disables checking, `unknown` forces narrowing, `never` as "cannot happen", `noImplicitAny` (part of `strict`, on by default since 6.0) | TS 6.0 / Node 22 | Replace every `any` in a parser with `unknown` and narrow |
| `literal-types` | Literal types and as const | Use exact values as types | string/number literal types, literal widening, `as const`, `readonly` inference, unions of literals as enum replacements (preview) | TS 5.0 / Node 22 | Model traffic-light states with literal types |

### Module B3 - Functions (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `function-types` | Typing functions | Annotate parameters, returns and function values | parameter and return types, function type expressions, contextual typing of callbacks [JS:function-forms] [JS:higher-order-functions] | TS 5.0 / Node 22 | Type a `map`-like helper and its callback |
| `optional-default-rest` | Optional, default and rest parameters | Type every parameter form | `x?`, defaults and inference, rest `...args: T[]`, destructured parameters with types, options objects [JS:parameters-js] | TS 5.0 / Node 22 | Type `formatName({ first, last, upper? })` |
| `void-and-undefined` | void, undefined and returns | Know the difference and why it matters | `void` return in callbacks, `undefined`-returning functions without `return` (5.1), `never` returns | TS 5.1 / Node 22 | Explain why `forEach(x => arr.push(x))` type-checks |
| `overloads` | Function overloads | Give one function several signatures | overload signatures vs implementation, when a union or generic is better, JSDoc `@overload` (5.0) for JS | TS 5.0 / Node 22 | `parse(x: string): number; parse(x: string[]): number[]` |
| `this-in-typescript` | Typing this | Catch lost-`this` bugs at compile time | `this` parameters, `noImplicitThis` (strict), arrow functions in classes [JS:this-basics] [JS:this-in-depth] | TS 5.0 / Node 22 | Make the compiler find 3 lost-`this` bugs |

### Module B4 - Unions and narrowing (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `union-types` | Union types | Accept several kinds of value safely | `A \| B`, what you can do with a union, unions vs overloads [F:conditionals] | TS 5.0 / Node 22 | `formatId(id: string \| number)` |
| `narrowing-basics` | Narrowing with typeof, truthiness and equality | Make a union specific | control-flow analysis, `typeof`, truthiness pitfalls with `0`/`""` [JS:coercion], `===`, 5.6 errors on always-truthy checks | TS 5.6 / Node 22 | Fix 5 narrowing bugs the compiler reports |
| `in-instanceof-narrowing` | Narrowing with in and instanceof | Narrow objects and classes | `in` (unlisted properties, 4.9), `instanceof`, `Symbol.hasInstance` (5.3), `switch (true)` (5.3) | TS 5.3 / Node 22 | Handle `Error \| Response \| string` results |
| `discriminated-unions` | Discriminated unions | Model states with a tag field | `kind` tags, `switch` on the tag, impossible states made unrepresentable | TS 5.0 / Node 22 | Model a fetch state: idle, loading, success, error |
| `exhaustiveness` | Exhaustiveness checking with never | Make the compiler find missing cases | `never` in `default`, `assertNever`, `satisfies never` | TS 5.0 / Node 22 | Add a new shape and let the compiler list every place to update |
| `null-and-undefined-strict` | strictNullChecks, ?. and ?? | Handle missing values with the compiler's help | `strictNullChecks` (strict), `?.`/`??` types [JS:null-undefined-nullish], non-null `!` and why to avoid it, definite assignment | TS 6.0 / Node 22 | Remove every `!` from a module safely |

### Module B5 - Interfaces, type aliases and classes (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `interfaces-vs-aliases` | Interfaces and type aliases | Choose between `interface` and `type` | `interface`, `type`, `extends` vs `&`, declaration merging preview, naming conventions | TS 5.0 / Node 22 | Rewrite 5 aliases as interfaces and say which should stay aliases |
| `index-signatures-and-records` | Index signatures and Record | Type dictionaries | `{ [key: string]: T }`, `Record<K, V>`, `Map<K, V>` [JS:map-and-set], `noUncheckedIndexedAccess` (on in `tsc --init` since 5.9) | TS 5.0 / Node 22 | Word counter typed with `Record` and then `Map` |
| `classes-in-typescript` | Classes in TypeScript | Type classes without non-erasable syntax | field declarations, `public`/`private`/`protected` vs `#private` [JS:private-and-static], `readonly`, `override`, `abstract`, why no parameter properties (not erasable) [JS:classes] | TS 5.8 / Node 22 | Bank account class with `#balance` and an abstract base |
| `implements-and-structural` | implements and structural typing | Program to interfaces | `implements`, structural compatibility, classes as types, nominal-feeling tricks preview | TS 5.0 / Node 22 | Two loggers that satisfy one interface without sharing a base class |
| `optional-and-readonly-modifiers` | Optional, readonly and exact properties | Use property modifiers precisely | `?` vs `\| undefined`, `exactOptionalPropertyTypes` (on in `tsc --init` since 5.9), `readonly` is shallow, `Readonly<T>` | TS 5.0 / Node 22 | Settings object where "unset" and "explicitly undefined" differ |

### Module B6 - Modules and a first project (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `modules-in-typescript` | Modules, imports and file extensions | Split a TS program into modules | ES modules [JS:es-modules], `.ts` extensions in imports, `rewriteRelativeImportExtensions` (5.7), `module: nodenext`, `"type": "module"` vs `.mts` | TS 5.7 / Node 22 | Split a script into 3 modules that run with `node` and pass `tsc` |
| `type-only-imports` | Type-only imports and verbatimModuleSyntax | Import types so they erase cleanly | `import type`, inline `type` specifiers, `export type`, `export type *` (5.0), `verbatimModuleSyntax` (5.0), the Node runtime error without `type` | TS 5.0 / Node 22 | Fix a project that crashes in Node but passes old `tsc` settings |
| `erasable-syntax` | Erasable syntax only | Know what Node can strip and what it cannot | `erasableSyntaxOnly` (5.8), the non-erasable list (`enum`, runtime `namespace`, parameter properties, `import =`, `<T>x`), `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` | TS 5.8 / Node 22 | Rewrite a file with 5 non-erasable constructs |
| `types-for-node` | Typing Node.js code | Use Node APIs with types | `@types/node`, `"types": ["node"]` (needed since 6.0), `node:` imports, `process.argv`, JSON modules with `with { type: "json" }` (5.3) [JS:json-modules-dynamic-import] | TS 6.0 / Node 22 | Typed `wc` clone over files |
| `project-typed-quiz` | Project: a typed command-line quiz | Combine the beginner material | discriminated unions for questions, typed JSON data, narrowing user input, modules, `tsc --noEmit` before `node` | TS 6.0 / Node 22 | Port the JS quiz [JS:project-cli-quiz] to TypeScript |

---

## Intermediate (33 lessons)

### Module I1 - Generics (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `generic-functions` | Generic functions | Write functions that keep type information | type parameters, inference of type arguments, explicit `<T>` at call sites, the "use a generic only to relate two things" rule | TS 5.0 / Node 22 | Typed `first`, `last`, `groupBy` |
| `generic-constraints` | Constraints and keyof | Limit what a type parameter accepts | `extends`, `keyof`, `K extends keyof T`, `pluck` | TS 5.0 / Node 22 | Type-safe `pick(obj, keys)` |
| `generic-types-and-classes` | Generic interfaces, aliases and classes | Build reusable containers | `Box<T>`, `Result<T, E>`, generic classes, defaults `<T = string>` [JS:data-structures-js] | TS 5.0 / Node 22 | Generic `Stack<T>` and `Queue<T>` |
| `const-type-parameters` | const type parameters | Infer literal types without `as const` at the call site | `<const T>` (5.0), readonly inference, when to use it | TS 5.0 / Node 22 | A `routes()` helper that keeps exact paths |
| `noinfer` | Controlling inference with NoInfer | Stop a parameter from widening a type argument | inference candidates, `NoInfer<T>` (5.4), contextual sensitivity and the 6.0 `this`-less change | TS 6.0 / Node 22 | Fix a `createFSM` helper that accepts invalid states |
| `generic-patterns` | Generic design patterns | Know when generics help and when they hurt | over-generic code, returning `T` vs `unknown`, builders, typed event emitters | TS 5.0 / Node 22 | Typed event emitter where `on("save", cb)` knows the payload |

### Module I2 - Type operators (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `keyof-typeof` | keyof and typeof types | Derive types from values | `typeof` in type position, `keyof typeof obj`, single source of truth | TS 5.0 / Node 22 | Derive a union of config keys from a defaults object |
| `indexed-access-types` | Indexed access types | Look up types inside types | `T["key"]`, `T[number]` for array elements, `(typeof arr)[number]` | TS 5.0 / Node 22 | Extract the element type of an API response array |
| `conditional-types` | Conditional types | Choose a type based on another | `T extends U ? X : Y`, distribution over unions, `[T] extends [U]` | TS 5.0 / Node 22 | Implement `NonNullable` and `Flatten` yourself |
| `infer-keyword` | infer | Extract parts of types | `infer` in conditional types, `ReturnType`/`Parameters`/`Awaited` from scratch, `infer X extends string` | TS 5.0 / Node 22 | `ElementOf<T>` and `PromiseValue<T>` |
| `mapped-types` | Mapped types | Transform every property | `{ [K in keyof T]: ... }`, `readonly`/`?` modifiers and `-`, key remapping with `as` | TS 5.0 / Node 22 | `Getters<T>` that maps `name` to `getName()` |
| `template-literal-types` | Template literal types | Type string patterns | `` `on${Capitalize<K>}` ``, intrinsic string types, inference through templates (TS 7 splits by code point) | TS 7.0 / Node 22 | Type-safe event names from a list of keys |

### Module I3 - Utility types and immutability (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `built-in-utility-types` | Built-in utility types | Use the standard library of types | `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `ReturnType`, `Parameters`, `Awaited`, `NoInfer` | TS 5.4 / Node 22 | Type create/update/read DTOs from one model |
| `readonly-and-immutability` | readonly, as const and immutability | Prevent mutation at compile time | `readonly` arrays and tuples, `ReadonlyMap`/`ReadonlySet`, `as const`, `Object.freeze` typing [JS:copies-and-references] | TS 5.0 / Node 22 | Make a reducer that cannot mutate its state |
| `satisfies-operator` | The satisfies operator | Check a value without widening it | `satisfies` (4.9) vs annotation vs `as`, config objects, `as const satisfies` | TS 5.0 / Node 22 | Type a route table that keeps literal paths and is still checked |
| `enum-alternatives` | Enums and their erasable alternatives | Read enums and write the modern replacement | `enum` and `const enum` (not erasable; read, do not write), union-of-literals, `as const` objects plus `(typeof X)[keyof typeof X]` | TS 5.8 / Node 22 | Convert 3 enums to `as const` objects; the enum file is type-check only |
| `utility-type-recipes` | Utility type recipes | Combine operators into useful helpers | `DeepReadonly`, `ValueOf`, `RequireAtLeastOne`, `Prettify`, when a recipe is too clever | TS 5.0 / Node 22 | Build and test 4 helpers with `@ts-expect-error` assertions |

### Module I4 - Narrowing and safety in depth (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `type-predicates` | Type predicates | Write and recognise custom type guards | `x is T`, inferred type predicates (5.5) for `filter`, `asserts x is T` | TS 5.5 / Node 22 | `arr.filter(x => x !== null)` with and without 5.5 inference |
| `control-flow-analysis` | Control-flow analysis in depth | Predict what the compiler knows where | narrowing in closures after last assignment (5.4), constant indexed access (5.5), never-initialised variables (5.7), aliased conditions | TS 5.7 / Node 22 | Explain 6 surprising narrowing results |
| `unknown-at-boundaries` | Validating unknown data | Turn untrusted input into typed values | `JSON.parse` returns `any`, `unknown` at boundaries, hand-written validators, schema libraries (Zod, Valibot) named only, "parse, don't validate" [JS:json-js] [F:clean-code-and-security-basics] | TS 5.5 / Node 22 | Validate a config file into a typed object |
| `errors-and-catch` | Typing errors | Handle errors without `any` | `useUnknownInCatchVariables` (strict), `instanceof Error`, `cause` [JS:errors-basics-js], `Result` types vs exceptions, `Error.isError` (Node 24) | TS 6.0 / Node 22 | Rewrite throwing code to return `Result<T, E>` |
| `async-types` | Typing async code | Type promises and async iteration | `Promise<T>`, `Awaited`, async functions, `for await`, floating promises [JS:async-await] [JS:promise-combinators] [JS:async-iteration] | TS 5.0 / Node 22 | Typed concurrency-limited `mapAsync` |

### Module I5 - Configuration and tooling (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `tsconfig-deep-dive` | tsconfig in depth | Choose strictness and output options deliberately | the `strict` family, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `extends` with several configs (5.0), `${configDir}` (5.5), the 6.0 defaults | TS 6.0 / Node 22 | Tighten a loose config one flag at a time and fix the fallout |
| `module-resolution` | module, moduleResolution and package.json | Configure how imports are found | `nodenext` vs `bundler` vs `preserve` (5.4), `node20` (5.9), `"exports"`/`"imports"`, `#/` subpath imports (6.0), `require(esm)` (5.8) [JS:npm-in-depth] [JS:commonjs-awareness] | TS 6.0 / Node 22 | Replace a `baseUrl`/`paths` setup with subpath imports |
| `target-and-lib` | target and lib | Match types to the runtime | `target` (default `es2025`), `lib: ["esnext"]` for ES2026/27 APIs (`getOrInsert`, `Temporal` types in 6.0), `dom`, `lib` vs runtime support [JS:temporal] [JS:maps-sets-in-depth] | TS 6.0 / Node 26 | Get `Temporal` and `getOrInsert` to type-check and run on Node 26 |
| `testing-typescript` | Testing TypeScript code | Run typed tests | `node --test` on `.test.ts` files via type stripping, `node:assert/strict` [JS:node-test], `tsc --noEmit` in the test script, type tests with `@ts-expect-error` | TS 5.8 / Node 22 | Test the I1 generic `Stack<T>`, values and types |
| `linting-typescript` | Linting TypeScript | Add type-aware lint rules | typescript-eslint (named, not version-pinned), `no-floating-promises`, `no-explicit-any`, formatting [JS:lint-format] | TS 5.0 / Node 22 | Lint a project and fix the type-aware findings |
| `build-and-emit` | Emitting JavaScript with tsc | Produce JS and `.d.ts` for distribution | `outDir`, `rootDir` (defaults to the tsconfig folder since 6.0), `declaration`, `sourceMap`, `rewriteRelativeImportExtensions` (5.7), `--watch`, `noEmit` vs emit | TS 6.0 / Node 22 | Build `src/` to `dist/` and run the output |

### Module I6 - TypeScript and JavaScript together (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `jsdoc-and-checkjs` | Type-checking JavaScript with JSDoc | Get types without converting files | `// @ts-check`, `checkJs`, `@type`, `@param`, `@typedef`, `@import` (5.5), `@satisfies`; TS 7 drops Closure-style JSDoc and constructor functions [JS:types-for-js] | TS 7.0 / Node 22 | Add JSDoc to the JS track's CLI and fix what the checker finds |
| `migrating-js-to-ts` | Migrating a JavaScript project | Convert incrementally | `allowJs`, file-by-file renames, loosening then tightening flags, `// @ts-expect-error` budget | TS 6.0 / Node 22 | Migrate a 5-file JS project, strict at the end |
| `untyped-packages` | Packages without types | Use any npm package safely | `@types/*` from DefinitelyTyped, `types` array, `declare module "pkg"` shims, `skipLibCheck` trade-offs | TS 6.0 / Node 22 | Write a minimal declaration for an untyped package |
| `typing-http-and-json` | Typing fetch, HTTP and JSON | Type data that crosses the network | `fetch` and `Response.json()` returning `any`/`unknown`, validators from I4, typed `node:http` handlers [JS:http-and-fetch] | TS 5.5 / Node 22 | Typed client for a local mock API |
| `project-typed-api-client` | Project: a tested, typed API client | Combine intermediate material | generics, discriminated `Result`, validation, `node:test`, `tsc --noEmit` | TS 6.0 / Node 24 | Port [JS:project-rest-client] to TypeScript with full types |

---

## Advanced (21 lessons)

### Module A1 - Type-level programming (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `recursive-types` | Recursive types | Model trees and nested data | recursive aliases, `JSON` value type, recursion limits [F:recursion] [F:trees-and-graphs] | TS 5.0 / Node 22 | Type a JSON value and a typed tree walker |
| `distributive-conditionals` | Distribution and its control | Predict conditional types over unions | naked type parameters, `[T]` wrapping, `never` as the empty union | TS 5.0 / Node 22 | Fix 4 helpers that distribute when they should not |
| `variance` | Variance | Explain assignability of generic types | covariance, contravariance, method bivariance, `strictFunctionTypes`, `in`/`out` annotations | TS 5.0 / Node 22 | Find the unsound assignment in an event-handler API |
| `branded-types` | Branded and nominal types | Stop mixing values with the same shape | brands with `unique symbol`, smart constructors, `UserId` vs `OrderId` | TS 5.0 / Node 22 | Brand IDs and money amounts in an order system |
| `type-level-parsing` | Type-level string parsing | Compute types from strings | template literal inference, recursive conditional types, route-parameter extraction | TS 7.0 / Node 22 | `Params<"/users/:id/posts/:postId">` |
| `testing-types` | Testing types | Lock down type behaviour | `@ts-expect-error` assertions, `Expect<Equal<A, B>>` helpers, type tests in CI with `tsc --noEmit` | TS 5.0 / Node 22 | Write type tests for the A1 helpers |

### Module A2 - Classes, decorators and resources (5)

Decorators are not erasable and are Stage 2.7 in TC39, so these examples are **type-checked only** (`tsc --noEmit`)
or compiled with `tsc` and the output run. Say so on each page.

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `decorators` | Decorators (standard) | Write class and method decorators | TS 5.0 decorators, `context` object, `addInitializer`, `accessor` (4.9), TC39 status Stage 2.7 [JS:decorators-status], Node cannot strip them | TS 5.0 / Node 22 | `@logged` and `@bound` method decorators, compiled with `tsc` |
| `decorator-metadata` | Decorator metadata | Attach and read metadata | `context.metadata`, `Symbol.metadata` (5.2), lib `esnext.decorators` | TS 5.2 / Node 22 | A tiny validation library driven by metadata |
| `legacy-decorators` | Legacy experimental decorators | Read older framework code | `experimentalDecorators`, `emitDecoratorMetadata`, how they differ from standard ones, why not to start new code with them | TS 5.0 / Node 22 | Port a legacy decorator to the standard form |
| `using-in-typescript` | using and Disposable types | Type explicit resource management | `using`/`await using` (5.2), `Disposable`/`AsyncDisposable`, `DisposableStack`, `lib: esnext.disposable` [JS:using-declarations] | TS 5.2 / Node 24 | Typed temp-directory resource used with `await using` |
| `class-patterns` | Mixins and advanced class typing | Type reusable class behaviour | mixin functions with constructor types, `abstract new`, `InstanceType`, composition over inheritance [JS:inheritance-composition] | TS 5.0 / Node 22 | `Timestamped` and `Serializable` mixins |

### Module A3 - Declarations and libraries (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `declaration-files` | Writing declaration files | Describe JavaScript with `.d.ts` | `declare`, ambient modules, `declare global`, `export =` in `.d.ts` for CommonJS packages | TS 5.0 / Node 22 | Hand-write `.d.ts` for a small JS library |
| `declaration-merging` | Declaration merging and augmentation | Extend existing types | interface merging, module augmentation, global augmentation, why type-only `namespace` is still fine | TS 5.0 / Node 22 | Augment a library's options interface |
| `publishing-typed-packages` | Publishing a typed package | Ship JS and types that resolve everywhere | `"exports"` with `"types"` conditions, ESM-only packages, `declaration`/`declarationMap`, Node refuses `.ts` in `node_modules` [JS:package-authoring] | TS 6.0 / Node 22 | `npm pack` a library and consume it from a second project |
| `isolated-declarations` | isolatedDeclarations | Make declaration emit fast and tool-friendly | `--isolatedDeclarations` (5.5), explicit export types, `isolatedModules`, `--noCheck` (5.6) for emit-only builds | TS 5.6 / Node 22 | Make a library pass `isolatedDeclarations` |
| `project-references` | Project references and build mode | Split a codebase into projects | `composite`, `references`, `tsc -b`, `--builders` (7.0), incremental builds | TS 7.0 / Node 22 | Split an app into `core`, `cli` and `tests` projects |

### Module A4 - Compiling, bundling and shipping (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `non-erasable-features` | Non-erasable TypeScript | Read and migrate code that needs a compiler | `enum`, `const enum`, runtime `namespace`, parameter properties, `import =`/`export =`, `<T>x`; what each compiles to; migration to erasable forms | TS 5.8 / Node 22 | Migrate a legacy file until it passes `erasableSyntaxOnly` |
| `strip-vs-compile` | Strip, compile or bundle? | Pick the right pipeline | Node stripping (no checks, no `tsconfig`), `tsc` emit, `--noCheck` (5.6), transpile-only tools (esbuild, tsx), `isolatedModules`, `import defer` (5.9) needs a supporting runtime or bundler | TS 5.9 / Node 22 | Ship one app three ways and compare |
| `bundlers-and-frameworks` | TypeScript with bundlers | Build browser apps in TypeScript | `module: preserve` + `bundler` (5.4), Vite/esbuild, `.tsx` and `jsx: react-jsx` (Node cannot run `.tsx`), `lib: ["dom"]` includes iterables (6.0) [JS:bundlers] | TS 6.0 / browser Baseline | Small typed browser app built with a bundler |
| `typescript-in-ci` | TypeScript in CI | Check types on every change | `npm ci`, `tsc --noEmit` / `tsc -b`, caching `.tsbuildinfo`, failing on errors, pinning the TS version | TS 7.0 / Node 22 | Add a type-check job to a project |
| `project-typed-fullstack` | Project: a typed full-stack app | Combine advanced material | shared types between server and client, validated API boundary, branded IDs, project references | TS 7.0 / Node 22 | Port [JS:project-fullstack] to TypeScript |

---

## Expert (15 lessons)

TS 7's internals are documented only by the typescript-go README/CHANGES.md and the repository source; the
announcement post and any 7.0 release notes were blocked during this research. **Re-verify every compiler-internals
and performance claim before writing.**

### Module E1 - Inside the compiler (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `compiler-pipeline` | How tsc works | Describe scanner, parser, binder, checker and emitter | phases, AST, symbols, program and source files, `--explainFiles`, `--listFiles` | TS 7.0 / Node 22 | Trace why a file is in the program with `--explainFiles` |
| `native-compiler` | TypeScript 7: the native compiler | Explain what changed in the Go port | Strada vs Corsa, same checker semantics as 6.0, parallel checking, `--checkers`, `--builders`, `--singleThreaded`, deterministic type ordering (`--stableTypeOrdering` in 6.0), UTF-8 positions | TS 7.0 / Node 22 | Measure a project with different `--checkers` values |
| `type-check-performance` | Type-checking performance | Find and fix slow types | `--extendedDiagnostics`, `--generateTrace`, `--generateCpuProfile`, expensive unions and conditional types, `types` array (6.0) and `skipLibCheck` | TS 7.0 / Node 22 | Halve the check time of a slow project |
| `compiler-api` | The compiler API | Use TypeScript programmatically | TS 7 ships the API under `typescript/unstable/*` only (README: "not ready"); stay on `typescript@6` for stable `ts.createProgram`; AST walking | TS 7.0 / Node 22 | A script that lists every exported function and its type, on 6.0 |
| `language-service` | The language service and editors | Know how editor features work | LSP, tsserver vs the TS 7 language server ("nearly all features implemented"), plugins, why editor and CLI can disagree | TS 7.0 / Node 22 | Diagnose an editor/CLI version mismatch |

### Module E2 - The type system in depth (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `structural-typing-and-soundness` | Soundness and its holes | Know where the type system lies | `any`, method bivariance, array covariance, index access without `noUncheckedIndexedAccess`, type assertions, `!` | TS 5.0 / Node 22 | Write 6 programs that type-check and crash |
| `assignability-rules` | Assignability in depth | Predict assignability exactly | subtype vs assignability, excess property checks, weak types, `object` vs `{}` vs `Object`, `unknown` and `never` | TS 5.0 / Node 22 | Predict 15 assignments, then verify with `tsc` |
| `inference-in-depth` | How inference works | Predict and steer type-argument inference | candidates and priorities, contextual sensitivity (6.0 `this`-less change), `NoInfer`, `const` type parameters, return-type inference | TS 6.0 / Node 22 | Fix 5 inference failures without explicit type arguments |
| `type-system-limits` | Limits of the type system | Stay within depth and complexity limits | instantiation depth errors, tail-recursive conditional types, union size limits, when to stop computing types | TS 5.0 / Node 22 | Rewrite a type that hits "excessively deep" |
| `api-design-with-types` | Designing APIs with types | Make misuse a compile error | builder and state-machine types, overloads vs generics, error messages users can read, breaking changes in `.d.ts` | TS 5.0 / Node 22 | Design a typed query builder |

### Module E3 - TypeScript at scale (5)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `monorepos` | Monorepos and workspaces | Organise many packages | npm workspaces, project references, shared `tsconfig` bases with `extends`, `${configDir}` | TS 7.0 / Node 22 | Turn 3 packages into a referenced workspace |
| `upgrading-to-ts7` | Upgrading from 5.x to 6.0 to 7.0 | Plan a compiler upgrade | 6.0 deprecations and new defaults, `ignoreDeprecations` (6.0 only), the `ts5to6` codemod (experimental), `--stableTypeOrdering` to compare, tools that need the JS API | TS 7.0 / Node 22 | Upgrade a 5.x project with `baseUrl`, `node10` and ES5 settings |
| `strictness-at-scale` | Raising strictness in a large codebase | Turn on strict flags without stopping work | per-flag rollout, error budgets, `@ts-expect-error` tracking, codemods | TS 6.0 / Node 22 | Plan and start a `noUncheckedIndexedAccess` rollout |
| `runtime-type-safety` | Types at runtime boundaries | Keep types honest at every edge | schema-first types, generated types (OpenAPI), env vars, database rows, `satisfies` for config, branded IDs | TS 5.5 / Node 22 | Generate types for a JSON schema and validate against it |
| `typescript-review-project` | Project: a type-safety review | Review and harden a real codebase | audit `any`/`as`/`!`, strict flags, boundary validation, type tests, CI | TS 7.0 / Node 22 | Review and fix the A4 full-stack app |

---

## Counts

- Beginner 32 (B1 5, B2 6, B3 5, B4 6, B5 5, B6 5).
- Intermediate 33 (I1 6, I2 6, I3 5, I4 5, I5 6, I6 5).
- Advanced 21 (A1 6, A2 5, A3 5, A4 5).
- Expert 15 (E1 5, E2 5, E3 5).
- **Total 101 lessons in 19 modules**, every module 5 to 8 lessons.

---

## Examples plan (validation proposal; no scripts changed)

Goal: every TypeScript example is **type-checked** with `tsc --noEmit` and, when runnable, **run** with Node type
stripping and compared with its `.out`, exactly like the JavaScript step 2b in `scripts/validate.sh`.

1. **Layout**: `examples/typescript/<level>/<lesson-slug>/<name>.mts` with sibling `<name>.out` and optional `<name>.in`.
   Use `.mts` so each file is ESM whatever the nearest `package.json` says (same reason the JS track uses `.mjs`).
   Imports between example files use the real extension: `import { x } from "./lib.mts"`.
   One shared `examples/typescript/tsconfig.json` with the course config from facts.md (`noEmit`, `target: esnext`,
   `module: nodenext`, `rewriteRelativeImportExtensions`, `erasableSyntaxOnly`, `verbatimModuleSyntax`,
   `types: ["node"]`), plus `"include": ["**/*.mts", "**/*.cts", "**/*.ts"]`.
2. **Install (local and CI)**: commit `examples/typescript/package.json` with exact `devDependencies`
   `"typescript": "7.0.2"` and `"@types/node": "26.6.6"`, and its `package-lock.json`. Install with
   `npm ci --ignore-scripts --no-audit --no-fund --prefix examples/typescript` (tested: TS 7 has no install script;
   the native compiler arrives as an optional per-platform dependency, so do not pass `--omit=optional`).
   The compiler is then `examples/typescript/node_modules/.bin/tsc`; allow `TSC=/path/to/tsc` as an override, like
   `PYTHON=` and `NODE=`.
3. **Type-check step (new step 2d)**: `"$TSC" -p examples/typescript/tsconfig.json`. One project-wide run is fast with
   the native compiler and catches cross-file errors. Exit codes: 0 clean, 1 errors with `noEmit`, 2 errors with emit
   (tested). Any non-zero is a FAIL; print the first 20 lines.
   Lessons that show a **deliberate type error** put that file in a folder with a `.type-error` marker (or name it
   `*.error.mts`) holding the expected compiler output in `<name>.tsc.out`. Exclude those from the project run and
   check each with `tsc --noEmit --ignoreConfig <same flags> file.mts`, comparing its output (with paths stripped)
   against `<name>.tsc.out`. This mirrors the "red test with a .out" rule.
4. **Run step (extend 2b, or a new 2e)**: for each `*.mts` with a `.out` (or every `*.mts` outside a `.modules`
   folder, the JS rule), run `cd "$dir" && timeout 30 "${NODE:-node}" name.mts < stdin` with
   `NODE_NO_WARNINGS=1 NO_COLOR=1`, strip `file://$dir/` and `$dir/` from output, and compare with `.out`.
   `*.test.mts` run as `node --test --test-reporter=spec name.test.mts` with the JS step's count-only comparison
   (tested on 22.23.4 and 26.11.1). Node needs no flags: stripping is on by default in 22.18+ and stable in 24.12+/26.
   Important: today's 2b `find` matches `*.mjs`, `*.cjs` and `*.js` only, so `.mts` files are not picked up by
   accident; the new step must add them explicitly and keep `-not -path '*/node_modules/*'` (the installed
   `typescript` package ships `.js` files).
5. **Type-check-only examples** (non-erasable code: `enum`, parameter properties, decorators in A2, `.tsx` in A4):
   a folder with a `.typecheck-only` marker is type-checked with its own `tsconfig.json` (without
   `erasableSyntaxOnly`, with `experimentalDecorators` only for the legacy lesson) and never run by Node. Decorator
   lessons that show output compile with `tsc --outDir` into a temp dir and run the emitted `.js`.
6. **Why both tools**: Node alone does not type-check (a type error runs fine); `tsc` alone does not prove the output
   in the lesson. `erasableSyntaxOnly` + `verbatimModuleSyntax` in the shared config guarantee that whatever
   passes `tsc` also strips in Node (missing `type` on a type import and non-erasable syntax are compile errors).
7. **Version gating**: frontmatter `minVersion` holds the TS version as a number (`"5.8"`), so `check_versions.py`'s
   numeric regex keeps working; the Node minimum (above 22) is stated on the page and enforced by running all
   examples on the pinned Node 26. Optional: a job that runs the TS examples on Node 22.18+ to prove the "Node 22" claims.
8. **CI**: in `.github/workflows/ci.yml`, after the existing Node 26 setup (which already exports `NODE`), add
   `npm ci --ignore-scripts --no-audit --no-fund --prefix examples/typescript` and
   `echo "TSC=$PWD/examples/typescript/node_modules/.bin/tsc" >> "$GITHUB_ENV"`. Cache with `actions/setup-node`'s
   `cache-dependency-path: examples/typescript/package-lock.json` if wanted. Pin exact versions so compiler messages
   in `.tsc.out` files do not drift; bump `typescript` deliberately (7.1 is in beta since 2026-10-20).
9. **Local machine**: system Node here is v22.23.4, which runs every stripping example that does not need Node 26
   APIs; `NODE=/path/to/node26` is needed for a full run, as for JavaScript.
