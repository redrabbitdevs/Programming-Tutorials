export function grade(score) {
  if (score < 0 || score > 100) {
    throw new RangeError("score out of range");
  }
  if (score >= 50) return "pass";
  return "fail";
}
