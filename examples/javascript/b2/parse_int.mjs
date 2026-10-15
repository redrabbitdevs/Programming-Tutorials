console.log(parseInt("42px"), parseInt("px42"), parseInt("3.9"));
console.log(parseInt("101", 2), parseInt("ff", 16), parseInt("0x1f"));
console.log(parseInt("08", 10), parseInt("", 10));
console.log(parseFloat("3.14abc"), Number("3.14abc"));
console.log(["1", "2", "3"].map(parseInt));
console.log(["1", "2", "3"].map(Number));
console.log(["10", "10", "10"].map((s) => parseInt(s, 10)));
