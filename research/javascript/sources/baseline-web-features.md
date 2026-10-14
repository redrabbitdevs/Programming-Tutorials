# Baseline status of JS features (web-features data and MDN)

- Primary data: the `web-features` package, version 3.42.0, published 2026-10-09
  (https://registry.npmjs.org/web-features/-/web-features-3.42.0.tgz, file `data.json`). This is the
  dataset web.dev/baseline and MDN's Baseline banners are generated from (WebDX Community Group).
- web.dev/baseline itself: BLOCKED from this environment (proxy CONNECT refused).
- MDN pages (direct fetch, Baseline banners verbatim):
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal: "Limited availability. This feature is not Baseline because it does not work in some of the most widely-used browsers."
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using: "Limited availability" (same text)
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise: "Baseline 2026. Newly available. Since April 2026, this feature works across the latest devices and browser versions."
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with: "Baseline 2025. Newly available. Since April 2025 ..."
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with: "Deprecated. Avoid using this feature in new projects. JavaScript strict mode prohibits the with statement."
- Accessed: 2026-10-14

`baseline`: `high` = widely available (30 months after newly available), `low` = newly available, `False` = not Baseline.
Columns: feature id | baseline | low date | high date | first supporting versions (from `status.support`).

```text
temporal                     | False | -          | -          | chrome 144, edge 144, firefox 139 (no Safari)
explicit-resource-management | False | -          | -          | chrome 134, edge 134, firefox 141 (no Safari)
is-error                     | False | -          | -          | chrome 134, firefox 138 (no Safari)
iterator-zip-zipkeyed        | False
iterator-includes            | False
iterator-join                | False
text-modules                 | False   (Text import attributes)
math-sum-precise             | low   | 2026-04-10 | -          | chrome 147, firefox 137, safari 26.2
getorinsert                  | low   | 2026-02-14 | -          | chrome 145, firefox 144, safari 26.2
iterator-concat              | low   | 2026-03-24 | -
uint8array-base64-hex        | low   | 2025-09-05 | -          | chrome 140, firefox 133, safari 18.2
json-raw                     | low   | 2025-03-31 | -          (JSON source text access)
regexp-escape                | low   | 2025-05-01 | -          | chrome 136, firefox 134, safari 18.2
json-modules                 | low   | 2025-04-29 | -          | chrome 123, firefox 138, safari 17.2
float16array                 | low   | 2025-04-04 | -          | chrome 135, firefox 129, safari 18.2
iterator-methods             | low   | 2025-03-31 | -          | chrome 122, firefox 131, safari 18.4
atomics-pause                | low   | 2025-04-01 | -
promise-try                  | low   | 2025-01-07 | -          | chrome 128, firefox 134, safari 18.2
set-methods                  | low   | 2024-06-11 | -          | chrome 122, firefox 127, safari 17
intl-segmenter               | low   | 2024-04-16 | -
abortsignal-timeout          | low   | 2024-04-18 | -
top-level-await              | low   | 2026-09-14 | -          | chrome 89, firefox 89, safari 27
array-fromasync              | high  | 2024-01-25 | 2026-07-25
array-group                  | high  | 2024-03-05 | 2026-09-05
promise-withresolvers        | high  | 2024-03-05 | 2026-09-05
string-wellformed            | high  | 2023-10-24 | 2026-04-24
array-by-copy                | high  | 2023-07-04 | 2026-01-04
import-maps                  | high  | 2023-03-27 | 2025-09-27
structured-clone             | high  | 2022-03-14 | 2024-09-14
array-at                     | high  | 2022-03-14 | 2024-09-14
object-hasown                | high  | 2022-03-14 | 2024-09-14
error-cause                  | high  | 2021-09-20 | 2024-03-20
weak-references              | high  | 2021-04-26 | 2023-10-26
nullish-coalescing           | high  | 2020-09-16 | 2023-03-16
logical-assignments          | high  | 2020-09-16 | 2023-03-16
bigint                       | high  | 2020-09-16 | 2023-03-16
globalthis                   | high  | 2020-01-15 | 2022-07-15
destructuring / spread / template-literals / async-iterators / async-generators | high | 2020-01-15 | 2022-07-15
js-modules                   | high  | 2018-05-09 | 2020-11-09
async-await                  | high  | 2017-04-05 | 2019-10-05
fetch                        | high  | 2017-03-27 | 2019-09-27
aborting (AbortController)   | high  | 2019-03-25 | 2021-09-25
let-const, generators, proxy-reflect | high | 2016-09-20 | 2019-03-20
class-syntax                 | high  | 2016-03-08 | 2018-09-08
promise, map, set, weakmap   | high  | 2015-07-29 | 2018-01-29
dedicated-workers            | high  | 2015-07-29 | 2018-01-29
streams                      | high  | 2022-06-28 | 2024-12-28
with                         | False   (deprecated statement)
arguments-callee             | False
```

Note: `top-level-await` shows "low" from 2026-09-14 with Safari 27 as the first counted version, although
Chrome and Firefox have had it since 89. The dataset tracks sub-features (for example in workers), so treat
top-level await as safe in modules on every engine, but quote the dataset's date if a lesson gives a Baseline year.
