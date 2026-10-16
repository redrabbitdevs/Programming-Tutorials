const score = 79.5;
const notANumber = typeof score !== "number" || Number.isNaN(score);

if (notANumber || score < 0 || score > 100) {
  console.log("invalid");
} else if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else if (score >= 60) {
  console.log("D");
} else {
  console.log("F");
}
