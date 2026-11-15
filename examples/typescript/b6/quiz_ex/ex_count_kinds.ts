import { loadQuestions } from "../quiz/load.ts";
import type { Question } from "../quiz/types.ts";

interface KindCounts {
  choice: number;
  text: number;
}

function countKinds(questions: readonly Question[]): KindCounts {
  const counts: KindCounts = { choice: 0, text: 0 };
  for (const question of questions) {
    counts[question.kind] += 1;
  }
  return counts;
}

console.log(countKinds(loadQuestions()));
