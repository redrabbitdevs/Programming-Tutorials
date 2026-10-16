const marks = [
  { student: "Ada", subject: "maths", score: 92 },
  { student: "Grace", subject: "maths", score: 78 },
  { student: "Ada", subject: "art", score: 64 },
  { student: "Linus", subject: "maths", score: 55 },
  { student: "Grace", subject: "art", score: 88 },
];

const passing = marks.filter((m) => m.score >= 60);
const maths = marks.filter((m) => m.subject === "maths");
const mathsAverage = maths.reduce((sum, m) => sum + m.score, 0) / maths.length;
const top = marks.filter((m) => m.score > 90).map((m) => m.student);
const failing = marks.find((m) => m.score < 60);

console.log(`Passing: ${passing.length}`);
console.log(`Maths average: ${mathsAverage}`);
console.log(`Top students: ${top.join(", ")}`);
console.log(`All at least 50: ${marks.every((m) => m.score >= 50)}`);
console.log(`First failing: ${failing.student}`);
