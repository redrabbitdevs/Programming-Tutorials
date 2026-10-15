function grade(score) {
  if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 100) {
    return "invalid";
  }
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

for (const s of [95, 80, 79.5, 60, 12, 101, "90", NaN]) {
  console.log(s, grade(s));
}
