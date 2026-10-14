# ECMA-262: ES2026 (17th edition) and the ES2027 draft

- URLs:
  - https://raw.githubusercontent.com/tc39/ecma262/es2026/spec.html (source of the ES2026 snapshot, tag/branch `es2026`)
  - https://raw.githubusercontent.com/tc39/ecma262/es2025/spec.html (ES2025 snapshot, for diffing)
  - https://raw.githubusercontent.com/tc39/ecma262/main/spec.html (living draft)
  - Rendered spec: https://tc39.es/ecma262/ (BLOCKED from this environment: proxy 403), https://262.ecma-international.org/ (BLOCKED)
- Accessed: 2026-10-14
- Retrieval: direct fetch of the spec source from the tc39/ecma262 repository (primary source)

## Edition metadata (verbatim)

```text
es2026/spec.html:
  title: ECMAScript<sup>&reg;</sup> 2026 Language&nbsp;Specification
  shortname: ECMA-262
This Ecma Standard defines the ECMAScript 2026 Language. It is the seventeenth edition of the ECMAScript Language Specification.

main/spec.html:
  title: ECMAScript<sup>&reg;</sup> 2027 Language&nbsp;Specification
This Ecma Standard defines the ECMAScript 2027 Language. It is the eighteenth edition of the ECMAScript Language Specification.
```

Not verified: the date the Ecma General Assembly approved ES2026 (ecma-international.org is blocked).
Editions are normally approved at the June GA. The existence of the `es2026` snapshot shows the edition was cut.

## Introduction: per-edition summaries (verbatim, ES2022 onward)

```text
ECMAScript 2022, the 13th edition, introduced top-level `await`, allowing the keyword to be used at the top level of modules; new class elements: public and private instance fields, public and private static fields, private instance methods and accessors, and private static methods and accessors; static blocks inside classes, to perform per-class evaluation initialization; the `#x in obj` syntax, to test for presence of private fields on objects; regular expression match indices via the `/d` flag, which provides start and end indices for matched substrings; the `cause` property on `Error` objects, which can be used to record a causation chain in errors; the `at` method for Strings, Arrays, and TypedArrays, which allows relative indexing; and `Object.hasOwn`, a convenient alternative to `Object.prototype.hasOwnProperty`.

ECMAScript 2023, the 14th edition, introduced the `toSorted`, `toReversed`, `with`, `findLast`, and `findLastIndex` methods on `Array.prototype` and `TypedArray.prototype`, as well as the `toSpliced` method on `Array.prototype`; added support for `#!` comments at the beginning of files to better facilitate executable ECMAScript files; and allowed the use of most Symbols as keys in weak collections.

ECMAScript 2024, the 15th edition, added facilities for resizing and transferring ArrayBuffers and SharedArrayBuffers; added a new RegExp `/v` flag for creating RegExps with more advanced features for working with sets of strings; and introduced the `Promise.withResolvers` convenience method for constructing Promises, the `Object.groupBy` and `Map.groupBy` methods for aggregating data, the `Atomics.waitAsync` method for asynchronously waiting for a change to shared memory, and the `String.prototype.isWellFormed` and `String.prototype.toWellFormed` methods for checking and ensuring that strings contain only well-formed Unicode.

ECMAScript 2025, the 16th edition, added a new `Iterator` global with associated static and prototype methods for working with iterators; added methods to `Set.prototype` for performing common operations on Sets; added support for importing JSON modules as well as syntax for declaring attributes of imported modules; added the `RegExp.escape` method for escaping a string to be safely used in a regular expression; added syntax for enabling and disabling modifier flags inline within regular expressions; added the `Promise.try` method for calling functions which may or may not return a `Promise` and ensuring the result is always a `Promise`; and added a new `Float16Array` TypedArray kind as well as the related `DataView.prototype.getFloat16`, `DataView.prototype.setFloat16`, and `Math.f16round` methods.

ECMAScript 2026, the 17th edition, added `Math.sumPrecise` for summing an iterable of Numbers of varying magnitude while minimizing precision loss; `Iterator.concat` for sequencing iterators; `Array.fromAsync` for constructing Arrays from async iterables and other async sources; `Error.isError` for identifying error objects; methods to `Map.prototype` and `WeakMap.prototype` for providing a default value to use during retrieval when a key is not already present; methods to `Uint8Array` for converting to and from Strings of hexadecimal- and base64-encoded binary data; a parameter to `JSON.parse` revivers to access the matched segment of JSON source; and `JSON.rawJSON` for fine control over `JSON.stringify` output for primitive values.
```

The earlier editions (ES2016 to ES2021) are summarised in the same introduction: ES2016 `**` and `Array.prototype.includes`; ES2017 async functions, `Object.values/entries`; ES2018 async iteration, object rest/spread, RegExp named groups/lookbehind/`s` flag; ES2019 `flat`/`flatMap`, `Object.fromEntries`, optional catch binding; ES2020 `BigInt`, `import()`, `globalThis`, `??`, `?.`, `Promise.allSettled`, `import.meta`; ES2021 `replaceAll`, `Promise.any`, `??=`/`&&=`/`||=`, `WeakRef`, numeric separators.

## Presence check (grep counts of the identifier in each spec source)

| identifier | es2025 | es2026 | main (ES2027 draft) |
|---|---|---|---|
| `Map.prototype.getOrInsert` | 0 | 4 | 4 |
| `Uint8Array.fromBase64` | 0 | 1 | 1 |
| `JSON.rawJSON` | 0 | 2 | 2 |
| `Iterator.concat` | 0 | 2 | 2 |
| `Error.isError` | 0 | 5 | 6 |
| `Math.sumPrecise` | 0 | 2 | 2 |
| `Array.fromAsync` | 0 | 2 | 2 |
| `DisposableStack` | 0 | 0 | 117 |
| `UsingDeclaration` | 0 | 0 | 47 |
| `Iterator.zip` | 0 | 0 | 2 |
| `Iterator.prototype.join` | 0 | 0 | 1 |
| `Atomics.pause` | 0 | 0 | 1 |
| `PlainDate` (Temporal) | 0 | 0 | 0 |

Temporal reached stage 4 in 2026-05 (see `tc39-proposals.md`) but its text had not been merged into the main draft on the access date. Iterator chunking and `Iterator.prototype.includes` were also not yet merged.
