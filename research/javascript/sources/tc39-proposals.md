# TC39 proposals: finished (stage 4) and active

- URLs:
  - https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md (fetched as https://raw.githubusercontent.com/tc39/proposals/main/finished-proposals.md)
  - https://github.com/tc39/proposals (README, fetched as https://raw.githubusercontent.com/tc39/proposals/main/README.md)
  - github.com itself returned 403 through the proxy; raw.githubusercontent.com worked.
- Accessed: 2026-10-14
- Retrieval: direct fetch (primary source)

## Finished proposals, 2024 onward

"Expected Publication Year" column, verbatim. "Stage 4 meeting" is the most recent meeting in the Meeting Notes column (where the proposal reached stage 4).

| Proposal | Stage 4 meeting | Expected Publication Year |
|---|---|---|
| iterator chunking | 2026-05 | 2027 |
| Iterator Includes | 2026-05 | 2027 |
| Iterator Join | 2026-09 | 2027 |
| Explicit Resource Management | 2026-05 | 2027 |
| `Atomics.pause` | 2026-05 | 2027 |
| Joint Iteration (`Iterator.zip`) | 2026-05 | 2027 |
| Temporal | 2026-05 | 2027 |
| `Upsert` (`getOrInsert`) | 2026-01 | 2026 |
| JSON.parse source text access | 2025-11 | 2026 |
| Iterator Sequencing (`Iterator.concat`) | 2025-11 | 2026 |
| Uint8Array to/from Base64 | 2025-07 | 2026 |
| `Math.sumPrecise` | 2025-07 | 2026 |
| `Error.isError` | 2025-05 | 2026 |
| `Array.fromAsync` | 2025-05 | 2026 |
| `RegExp.escape` | 2025-02 | 2025 |
| Redeclarable global `eval`-introduced `var`s | 2025-02 | 2025 |
| Float16 on TypedArrays, DataView, `Math.f16round` | 2025-02 | 2025 |
| `Promise.try` | 2024-10 | 2025 |
| Sync Iterator helpers | 2024-10 | 2025 |
| JSON Modules | 2024-10 | 2025 |
| Import Attributes | 2024-10 | 2025 |
| RegExp Modifiers | 2024-10 | 2025 |
| New Set methods | 2024-04 | 2025 |
| Duplicate named capture groups | 2024-04 | 2025 |
| ArrayBuffer transfer | 2024-02 | 2024 |
| `Promise.withResolvers` | 2023-11 | 2024 |
| Array Grouping | 2023-11 | 2024 |
| Resizable and growable ArrayBuffers | 2023-09 | 2024 |
| RegExp v flag | 2023-05 | 2024 |
| `Atomics.waitAsync` | 2023-05 | 2024 |
| Well-Formed Unicode Strings | 2023-05 | 2024 |
| Change Array by Copy | 2023-01 | 2023 |

## Active proposals (README), stage 3 and 2.7 only

```text
### Stage 3
Legacy RegExp features in JavaScript
Source Phase Imports
Dynamic Code Brand Checks
Deferring Module Evaluation        (import defer)
Non-extensible Applies to Private
Import Text
Error Stack Accessor
RegExp Buffer Boundaries (`\A`, `\z`, `\Z`)
Await Dictionary
Curtailing the power of "Thenables"
### Stage 2.7
Decorators                         (latest meeting note: 2026-05)
Decorator Metadata
ShadowRealm
ESM Phase Imports
Immutable ArrayBuffers
Import Bytes
JSON.parse options
export all from
Deferred Re-exports
### Stage 2 (selected)
`throw` expressions, Module Expressions, Pipeline Operator, Module Declarations,
Async Iterator helpers, Iterator.range, Async Context, Structs, `Math.clamp`,
`Error.captureStackTrace`, Amount, Error code property
```

Note for writers: **Decorators are listed at Stage 2.7, not Stage 3**, on the access date. Do not describe them as a standard JavaScript feature. TypeScript's own decorator implementation is a TypeScript matter.
