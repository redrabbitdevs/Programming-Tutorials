function kind(array) {
  const packed = %HasHoleyElements(array) ? "HOLEY" : "PACKED";
  if (%HasSmiElements(array)) return packed + "_SMI";
  if (%HasDoubleElements(array)) return packed + "_DOUBLE";
  return packed + "_ELEMENTS";
}

const a = [1, 2, 3];
console.log("[1, 2, 3]:", kind(a));
a.push(4.5);
console.log("push 4.5:", kind(a));
a.push("five");
console.log('push "five":', kind(a));
a.pop();
a.pop();
console.log("pop both:", kind(a));

const b = [1, 2, 3];
b[10] = 4;
console.log("b[10] = 4:", kind(b));
console.log("new Array(3):", kind(new Array(3)));
