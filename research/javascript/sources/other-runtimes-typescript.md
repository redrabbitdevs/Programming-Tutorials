# Deno, Bun and TypeScript: current versions

- Accessed: 2026-10-14
- deno.com, docs.deno.com, bun.sh, bun.com and typescriptlang.org were all BLOCKED (proxy CONNECT refused).
  The GitHub API (api.github.com) returned 403 for these repositories. Versions below come from each
  project's own repository files (raw.githubusercontent.com) and its own npm package, both published by the project.

## Deno

- https://github.com/denoland/deno/blob/main/Releases.md (fetched via raw.githubusercontent.com)

```text
# Releases
### 2.9.7 / 2026.09.16
### 2.9.6 / 2026.08.27
### 2.9.5 / 2026.08.06
### 2.9.0 / 2026.06.25
```

- npm `deno` package (https://registry.npmjs.org/deno): `latest` 2.9.6 (2026-08-27), dist-tag `lts` 2.2.15.
  The npm wrapper lags Releases.md by one patch; use **Deno 2.9.7 (2026-09-16)**.

## Bun

- https://github.com/oven-sh/bun/blob/main/LATEST (fetched via raw.githubusercontent.com): `1.4.3`
- npm `bun` package (https://registry.npmjs.org/bun): `latest` 1.4.3, published 2026-10-10T05:31:17Z.
  First 1.4.x on npm: 2026-08-20. First 1.3.x: 2025-10-10.

## TypeScript

- npm `typescript` package (https://registry.npmjs.org/typescript), published by Microsoft:

```text
latest  7.0.2   2026-07-08T15:55:18Z
rc      7.0.1-rc 2026-06-18
next    7.1.0-dev.20261014.1
minor first releases: 5.8 2025-02-28, 5.9 2025-07-31, 6.0 2026-03-23, 7.0 2026-07-08
```

Package description for 7.0.2: "TypeScript is a language for application scale JavaScript development"; bin `tsc`.
What changed in 6.0 and 7.0 was not verifiable here (typescriptlang.org blocked). It belongs in the
TypeScript track's own facts, verified from typescriptlang.org or the Microsoft devblog.
