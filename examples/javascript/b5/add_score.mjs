function addScore(student, score) {
  return { ...student, scores: [...student.scores, score] };
}

const ada = { name: "Ada", scores: [90] };
const updated = addScore(ada, 75);
console.log(ada);
console.log(updated);
