console.log(Boolean(false), Boolean(0), Boolean(-0), Boolean(0n));
console.log(Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN));
console.log("--- truthy ---");
console.log(Boolean("0"), Boolean("false"), Boolean(" "));
console.log(Boolean([]), Boolean({}), Boolean(-1), Boolean(Infinity));
