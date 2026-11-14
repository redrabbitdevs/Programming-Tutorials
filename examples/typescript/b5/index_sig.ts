interface Scores {
  [player: string]: number;
}

const scores: Scores = { ada: 90 };
scores.grace = 85;

console.log(scores);
console.log(scores.bob);
