import vm from "node:vm";

console.log(vm.runInNewContext("typeof process"));
console.log(vm.runInNewContext("x * 2", { x: 21 }));

const escape = 'this.constructor.constructor("return process")()';
const reached = vm.runInNewContext(escape);
console.log(reached === process, typeof reached.exit);
