function clamp(x, low, high) {
  if (x < low) return low;
  if (x > high) return high;
  return x;
}

console.log(clamp(15, 0, 10));
