function probe(label, object) {
  const results = [];
  for (const [action, fn] of [
    ["add", () => (object.extra = 1)],
    ["change", () => (object.value = 2)],
    ["delete", () => delete object.value],
  ]) {
    try {
      fn();
      results.push(`${action}:ok`);
    } catch (error) {
      results.push(`${action}:${error.name}`);
    }
  }
  console.log(label.padEnd(10), results.join(" "));
}

probe("normal", { value: 1 });
probe("noExtend", Object.preventExtensions({ value: 1 }));
probe("sealed", Object.seal({ value: 1 }));
probe("frozen", Object.freeze({ value: 1 }));
