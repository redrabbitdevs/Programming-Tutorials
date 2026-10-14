# Node.js releases and schedule

- URLs:
  - https://nodejs.org/en/about/previous-releases
  - https://nodejs.org/dist/index.json (machine-readable list of every release)
  - https://github.com/nodejs/Release/blob/main/schedule.json (fetched as https://raw.githubusercontent.com/nodejs/Release/main/schedule.json)
  - https://nodejs.org/en/blog/release/v26.0.0
- Accessed: 2026-10-14
- Retrieval: direct fetch (primary sources)

## Release policy (previous-releases page, verbatim)

```text
Major Node.js versions enter Current release status for six months, which gives library authors time to add support for them.
Historically (up to Node.js 26), odd-numbered releases (9, 11, etc.) become unsupported after six months, and even-numbered releases (10, 12, etc.) move to Active LTS status and are ready for general use.
Starting with Node.js 27, the release cycle will be annual and every major version will move to LTS status after its six-month Current phase (and six additional months of Alpha phase).
LTS release status is "long-term support", which typically guarantees that critical bugs will be fixed for a total of 30 months.
Production applications should only use Active LTS or Maintenance LTS releases.

Node.js Codename First released  Last updated  Status
v26     -        May 05, 2026   Oct 07, 2026  Current
v25     -        Oct 15, 2025   Mar 31, 2026  EOL
v24     Krypton  May 06, 2025   Sep 07, 2026  LTS
v23     -        Oct 16, 2024   May 14, 2025  EOL
v22     Jod      Apr 24, 2024   Sep 23, 2026  LTS
v20     Iron     Apr 17, 2023   Mar 24, 2026  EOL
v24.21.0 Latest LTS   v26.11.1 Latest Release
```

## schedule.json (verbatim entries)

```text
v20 {'start': '2023-04-18', 'lts': '2023-10-24', 'maintenance': '2024-10-22', 'end': '2026-04-30', 'codename': 'Iron'}
v22 {'start': '2024-04-24', 'lts': '2024-10-29', 'maintenance': '2025-10-21', 'end': '2027-04-30', 'codename': 'Jod'}
v24 {'start': '2025-05-06', 'lts': '2025-10-28', 'maintenance': '2026-10-20', 'end': '2028-04-30', 'codename': 'Krypton'}
v25 {'start': '2025-10-15', 'maintenance': '2026-04-01', 'end': '2026-06-01'}
v26 {'start': '2026-05-05', 'lts': '2026-10-28', 'maintenance': '2027-10-20', 'end': '2029-04-30', 'codename': ''}
v27 {'alpha': '2026-10-28', 'start': '2027-04-22', 'maintenance': '2027-10-20', 'end': '2030-04-30', 'codename': ''}
```

## dist/index.json: latest release per major (version, date, lts, V8)

```text
v26.11.1 2026-10-07 False   14.6.202.34
v24.21.0 2026-09-07 Krypton 13.6.233.17
v22.23.3 2026-09-23 Jod     12.4.254.21
v20.20.2 2026-03-24 Iron    11.3.244.8
```

## Node.js 26.0.0 release post (verbatim extract)

```text
2026-05-05, Version 26.0.0 (Current), @RafaelGSS
We're excited to announce the release of Node.js 26! Highlights include the Temporal API enabled by default,
updates to the V8 JavaScript engine to 14.6, Undici to 8.0, and several important deprecations and removals
As a reminder, Node.js 26 will enter long-term support (LTS) in October, but until then, it will be the "Current" release for the next six months.
The Temporal API is now enabled by default in Node.js 26.
The V8 engine is updated to version 14.6.202.33, which is part of Chromium 146.
This version also includes:
Upsert: [Weak]Map.prototype.getOrInsert(), [Weak]Map.prototype.getOrInsertComputed()
Iterator sequencing: Iterator.concat()
Deprecations and Removals
http.Server.prototype.writeHeader() is now fully removed. Use http.Server.prototype.writeHead() instead.
The legacy _stream_wrap, _stream_readable, _stream_writable, _stream_duplex, _stream_transform, and _stream_passthrough modules are now fully removed.
(SEMVER-MAJOR) module: runtime-deprecate module.register()
(SEMVER-MAJOR) module: remove --experimental-transform-types
```
