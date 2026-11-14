function noop(): undefined {}

function locate(items: string[], wanted: string): undefined {
  if (items.includes(wanted)) {
    console.log("found", wanted);
  }
}

console.log(noop(), locate(["a", "b"], "b"));
