# npm registry: typescript and related packages

- URLs:
  - https://registry.npmjs.org/typescript
  - https://registry.npmjs.org/@types%2Fnode
  - https://registry.npmjs.org/@typescript%2Fnative-preview
  - https://registry.npmjs.org/tsx
- Accessed: 2026-11-13 (registry `modified` for typescript: 2026-11-13T08:12:43Z)
- Retrieval: direct fetch of the registry JSON (published by Microsoft for `typescript`)

## typescript dist-tags (verbatim)

```text
latest  7.0.2
beta    7.1.0-beta
rc      7.0.1-rc
next    7.1.0-dev.20261113.1
(older tags: dev 3.9.4, insiders 4.6.2-insiders.20220225, tag-for-publishing-older-releases 4.1.6)
```

## Publish times (`time` field)

```text
5.8.2      2025-02-28T16:52:08Z      5.8.3  2025-04-05T00:17:37Z
5.9.2      2025-07-31T17:54:06Z      5.9.3  2025-09-30T21:19:38Z
6.0.0-beta 2026-02-11T18:26:37Z
6.0.1-rc   2026-03-06T17:33:10Z
6.0.2      2026-03-23T16:14:45Z      6.0.3  2026-04-16T23:38:27Z   (latest 6.x)
7.0.1-rc   2026-06-18T13:43:46Z
7.0.2      2026-07-08T15:55:18Z      (no later 7.0.x)
7.1.0-beta 2026-10-20T16:45:47Z
```

The first stable of each line is x.y.2 (x.y.0 is the beta, x.y.1 the RC). So "TypeScript 6.0" shipped
2026-03-23 and "TypeScript 7.0" shipped 2026-07-08. The brief's figure (7.0.2 latest as of 2026-10-17)
still holds on 2026-11-13.

## typescript@7.0.2 package.json (trimmed)

```json
{
  "name": "typescript", "version": "7.0.2", "license": "Apache-2.0",
  "description": "TypeScript is a language for application scale JavaScript development",
  "type": "module",
  "engines": { "node": ">=16.20.0" },
  "bin": { "tsc": "./bin/tsc" },
  "exports": {
    "./package.json": "./package.json",
    ".": "./lib/version.cjs",
    "./unstable/sync": "./dist/api/sync/api.js",
    "./unstable/async": "./dist/api/async/api.js",
    "./unstable/ast": "./dist/ast/index.js",
    "...": "more ./unstable/* entries (fs, proto, ast/is, ast/factory, ast/utils, ast/scanner, ast/visitor, ast/clone)"
  },
  "optionalDependencies": {
    "@typescript/typescript-linux-x64": "7.0.2",
    "@typescript/typescript-darwin-arm64": "7.0.2",
    "@typescript/typescript-win32-x64": "7.0.2",
    "...": "20 platform packages in all (aix, darwin, freebsd, linux arm/arm64/x64/loong64/mips64el/ppc64/riscv64/s390x, netbsd, openbsd, sunos, win32)"
  }
}
```

`lib/version.cjs` (the whole `.` export):

```js
const { version } = require("../package.json");
exports.version = version;
exports.versionMajorMinor = "7.0";
```

So in 7.0 the package's main entry exports only the version; the programmatic API is under
`typescript/unstable/*`. The compiler is a native executable shipped in the per-platform
`@typescript/typescript-<os>-<arch>` package (its `lib/` folder also holds the `lib.*.d.ts` files).
`npm install --ignore-scripts typescript@7.0.2` works: there is no install script (tested locally).

## Related packages

```text
@types/node                  latest 26.6.6 (2026-10-28); dist-tags ts5.9, ts6.0, ts7.0 all = 26.6.6
                             newest 22.x: 22.20.5, newest 24.x: 24.19.2
@typescript/native-preview   latest 7.0.0-dev.20260707.2 (2026-07-07); beta 7.0.0-dev.20260421.2
                             (the pre-release Go build, command "tsgo"; no builds after 7.0 shipped)
tsx                          latest 4.23.15 (2026-09-20)
```
