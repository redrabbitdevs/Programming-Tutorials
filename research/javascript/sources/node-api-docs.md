# Node.js API docs (v26.11.1): TypeScript, permissions, test runner, require(esm), fetch, CLI

- URLs (all served as "Node.js v26.11.1 Documentation"):
  - https://nodejs.org/api/typescript.html
  - https://nodejs.org/api/permissions.html
  - https://nodejs.org/api/test.html
  - https://nodejs.org/api/modules.html
  - https://nodejs.org/api/globals.html
  - https://nodejs.org/api/cli.html
- Accessed: 2026-10-14
- Retrieval: direct fetch (primary source). History tables are quoted verbatim, flattened to one line.

## TypeScript (type stripping)

```text
Modules: TypeScript
History: v26.0.0 Removed --experimental-transform-types flag. | v25.2.0, v24.12.0 Type stripping is now stable. | v24.3.0, v22.18.0 Type stripping no longer emits an experimental warning. | v23.6.0, v22.18.0 Type stripping is enabled by default. | v22.7.0 Added --experimental-transform-types flag.
Stability: 2 - Stable
Type stripping  Added in: v22.6.0
By default Node.js will execute TypeScript files that contains only erasable TypeScript syntax.
Node.js will replace TypeScript syntax with whitespace, and no type checking is performed.
To disable this feature, use the flag --no-strip-types. Node.js ignores tsconfig.json files ...
Type stripping is compatible with most versions of TypeScript but we recommend version 5.8 or newer with the following tsconfig.json settings: "noEmit": true, "target": "esnext", "module": "nodenext", "rewriteRelativeImportExtensions": true, "erasableSyntaxOnly": true, "verbatimModuleSyntax": true
The most prominent features that require transformation are: Enum declarations, namespace with runtime code, parameter properties, import aliases
Node.js refuses to handle TypeScript files inside folders under a node_modules path.
```

cli.html, `--no-strip-types`:

```text
Added in: v22.6.0 History: v25.2.0, v24.12.0 Type stripping is now stable, the flag was renamed from --no-experimental-strip-types to --no-strip-types. | v23.6.0, v22.18.0 Type stripping is enabled by default.
```

## Permission Model

```text
Permission Model  Added in: v20.0.0  History: v23.5.0, v22.13.0 This feature is no longer experimental.
Stability: 2 - Stable
The API exists behind a flag --permission which when enabled, will restrict access to all available permissions.
Enforce mode (default when using --permission): Access is denied and an ERR_ACCESS_DENIED error is thrown ...
Audit mode (when using --permission-audit): Permission checks are performed and violations are published through the diagnostics channel, but access is not denied.
When starting Node.js with --permission, the ability to access the file system through the fs module, access the network, spawn processes, use node:worker_threads, use native addons, use WASI, use FFI, and enable the runtime inspector will be restricted
Flags: --allow-fs-read, --allow-fs-write, --allow-net, --allow-child-process, --allow-worker, --allow-addons, --allow-wasi, --allow-ffi, --allow-openssl-store
```

## Test runner (`node:test`)

```text
Test runner  Added in: v18.0.0, v16.17.0  History: v20.0.0 The test runner is now stable.
Stability: 2 - Stable
Sections: Subtests; describe() and it() aliases; Watch mode; Running tests from the command line; Collecting code coverage; Mocking; Snapshot testing
Snapshot testing  Added in: v22.3.0  History: v23.4.0 Snapshot testing is no longer experimental.
Class: MockTimers  Added in: v20.4.0, v18.19.0  History: v23.1.0 The Mock Timers is now stable.
run() options history: v26.2.0 Added the testTagFilters option. ... v23.0.0, v22.10.0 Added coverage options.
test() history: v26.2.0 Added the tags option.
```

cli.html:

```text
--test  Added in: v18.1.0, v16.17.0  History: v20.0.0 The test runner is now stable.
--experimental-test-coverage  Added in: v19.7.0, v18.15.0 (still named "experimental")
--test-update-snapshots  Added in: v22.3.0  History: v23.4.0, v22.13.0 Snapshot testing is no longer experimental.
--watch  Added in: v18.11.0, v16.19.0  History: v22.0.0, v20.13.0 Watch mode is now stable.
--env-file=file  Added in: v20.6.0  History: v24.10.0, v22.21.0 The --env-file flag is no longer experimental.
--run  Added in: v22.0.0  History: v26.9.0 Passing --run without a command lists the available scripts.
--permission  Added in: v20.0.0  History: v23.5.0, v22.13.0 Permission Model is now stable.
```

## require(esm)

```text
Loading ECMAScript modules using require()  Added in: v22.0.0, v20.17.0
History: v25.4.0 This feature is no longer experimental. | v23.5.0, v22.13.0, v20.19.0 This feature no longer emits an experimental warning by default, though the warning can still be emitted by --trace-require-module. | v23.0.0, v22.12.0, v20.19.0 This feature is no longer behind the --experimental-require-module CLI flag. | v23.0.0, v22.12.0 Support 'module.exports' interop export in require(esm).
```

(Limit stated in the same section: `require()` cannot load an ES module that uses top-level `await`; it throws `ERR_REQUIRE_ASYNC_MODULE`.)

## Globals: fetch and WebSocket

```text
fetch  Added in: v17.5.0, v16.15.0  History: v21.0.0 No longer experimental. | v18.0.0 No longer behind --experimental-fetch CLI flag.
The implementation is based upon undici, an HTTP/1.1 client written from scratch for Node.js. You can figure out which version of undici is bundled in your Node.js process reading the process.versions.undici property.
Class: WebSocket  Added in: v21.0.0, v20.10.0  History: v22.4.0 No longer experimental. | v22.0.0 No longer behind --experimental-websocket CLI flag.
```
