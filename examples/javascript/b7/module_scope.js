var moduleVar = "module scope only";

console.log("typeof window.moduleVar:", typeof window.moduleVar);
console.log("this:", this);
console.log("globalThis === window:", globalThis === window);
