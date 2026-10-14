# Deprecated JS and Node.js features (MDN banners, Node deprecation list)

- Accessed: 2026-10-14. Direct fetch (primary sources).

## MDN "Deprecated" banners (verbatim: "Deprecated. Avoid using this feature in new projects.")

| Feature | URL |
|---|---|
| `with` statement ("JavaScript strict mode prohibits the with statement.") | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with |
| `arguments.callee` | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee |
| `Object.prototype.__proto__` | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto |
| `String.prototype.substr()` | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr |
| `escape()` | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape |
| `Date.prototype.getYear()` | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getYear |

Import attributes page (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with):

```text
A previous version of this proposal used the assert keyword instead of with. The assertion feature is now non-standard.
```

## Node.js deprecations (https://nodejs.org/api/deprecations.html, v26.11.1 docs)

```text
DEP0005: Buffer() constructor        Type: Application (non-node_modules code only)
DEP0040: node:punycode module        Type: Application (non-node_modules code only)
DEP0116: Legacy URL API              Type: Deprecation revoked
DEP0169: Insecure url.parse()        Type: Application (non-node_modules code only)
DEP0205: module.register()           Type: Runtime   "module.register() is deprecated. Use module.registerHooks()"
```

Node 26.0.0 also removed `http.Server.prototype.writeHeader()`, the `_stream_*` modules and the
`--experimental-transform-types` flag (see `node-releases.md`).
