setTimeout(() => console.log("30 ms timer"), 30);
setTimeout(() => console.log("10 ms timer"), 10);
setTimeout((a, b) => console.log("20 ms timer", a, b), 20, "x", "y");
console.log("all three scheduled");

const cancelled = setTimeout(() => console.log("never runs"), 5);
clearTimeout(cancelled);
