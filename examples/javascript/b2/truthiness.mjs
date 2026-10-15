function show(label, value) {
  console.log(`${label.padEnd(12)} ${Boolean(value)}`);
}

show("false", false);
show("0", 0);
show("-0", -0);
show("0n", 0n);
show('""', "");
show("null", null);
show("undefined", undefined);
show("NaN", NaN);
console.log("--- truthy ---");
show('"0"', "0");
show('"false"', "false");
show('" "', " ");
show("[]", []);
show("{}", {});
show("-1", -1);
show("Infinity", Infinity);
