export function nextCount(count, action, step = 1) {
  switch (action) {
    case "inc":
      return count + step;
    case "dec":
      return count - step;
    case "reset":
      return 0;
    default:
      return count;
  }
}
