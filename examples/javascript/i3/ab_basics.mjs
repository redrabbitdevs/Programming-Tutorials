const controller = new AbortController();
const { signal } = controller;

signal.addEventListener("abort", () => console.log("abort event fired"));
console.log("aborted?", signal.aborted);

controller.abort();
console.log("aborted?", signal.aborted);
console.log(signal.reason.name);

controller.abort();

const custom = new AbortController();
custom.abort("user pressed cancel");
console.log(custom.signal.reason);
