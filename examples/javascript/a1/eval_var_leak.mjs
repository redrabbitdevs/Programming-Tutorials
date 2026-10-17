eval("var fromDirect = 1");
console.log(typeof fromDirect, "fromDirect" in globalThis);

(0, eval)("var fromIndirect = 2");
console.log(typeof fromIndirect, globalThis.fromIndirect);

(0, eval)('"use strict"; var contained = 3');
console.log("contained" in globalThis);
