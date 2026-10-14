# Feature probe: which ES2025-ES2027 features each Node line actually has

- Binaries: official builds from https://nodejs.org/dist/v26.11.1/ and https://nodejs.org/dist/v24.21.0/
  (`node-vXX-linux-x64.tar.xz`; SHA-256 matched the published `SHASUMS256.txt`), plus the local `node` (v22.22.0).
- Run: 2026-10-14, Linux x64.
- Method: an `.mjs` script tests `typeof X === "function"` for each built-in, and compiles syntax
  (`using`, decorators, RegExp modifiers) with `new Function`/`new RegExp` inside `try`.
  A second script does `import data from "./data.json" with { type: "json" }`. A third runs a `.ts` file with an
  annotation and no flags.

```text
== v22.22.0 (V8 12.4.254.21-node.33)    == v24.21.0 (V8 13.6.233.17)    == v26.11.1 (V8 14.6.202.34)
feature                        22   24   26
Iterator helpers (ES2025)      yes  yes  yes
Set methods (ES2025)           yes  yes  yes
Promise.try (ES2025)           no   yes  yes
RegExp.escape (ES2025)         no   yes  yes
Float16Array (ES2025)          no   yes  yes
RegExp modifiers (ES2025)      no   yes  yes
Error.isError (ES2026)         no   yes  yes
Math.sumPrecise (ES2026)       no   no   no
Array.fromAsync (ES2026)       yes  yes  yes
Iterator.concat (ES2026)       no   no   yes
Map getOrInsert (ES2026)       no   no   yes
Uint8Array base64 (ES2026)     no   no   yes
JSON.rawJSON (ES2026)          yes  yes  yes
Temporal (ES2027)              no   no   yes
DisposableStack (ES2027)       no   yes  yes
using declaration (ES2027)     no   yes  yes
Iterator.zip (ES2027)          no   no   no
Iterator chunks (ES2027)       no   no   no
Iterator includes (ES2027)     no   no   no
Iterator join (ES2027)         no   no   no
Atomics.pause (ES2027)         no   yes  yes
decorators (stage 2.7)         no   no   no
JSON module import             ok   ok   ok
node file.ts (no flags)        ok   ok   ok   ("hello ts")
```

Takeaways:
- `Math.sumPrecise` is in ES2026 and Baseline 2026 in browsers (Chrome 147), but **no Node release has it yet** (Node 26 ships V8 14.6 = Chromium 146).
- Temporal, `Iterator.concat`, `getOrInsert` and `Uint8Array` base64/hex need **Node 26**.
- `using`/`DisposableStack`, `Promise.try`, `RegExp.escape`, `Float16Array`, `Error.isError` need **Node 24**.
- Type stripping runs `.ts` files unflagged on 22.18+ (here 22.22.0), stable from 24.12 / 25.2.
