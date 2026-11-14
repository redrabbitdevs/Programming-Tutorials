interface Scores {
  [player: string]: number;
}

const scores: Scores = { ada: 90 };
scores.grace = "high";

console.log(scores);
