import module from "node:module";

const { compileCacheStatus } = module.constants;
const nameOf = (status) =>
  Object.keys(compileCacheStatus).find((k) => compileCacheStatus[k] === status);

const first = module.enableCompileCache(".cache");
const second = module.enableCompileCache(".cache");
console.log("first call:", nameOf(first.status));
console.log("second call:", nameOf(second.status));
console.log("cache directory set:", module.getCompileCacheDir() !== undefined);

// Modules imported from now on are compiled through the cache.
const { count } = await import("./cli/rules.mjs");
console.log("rules loaded:", count);
