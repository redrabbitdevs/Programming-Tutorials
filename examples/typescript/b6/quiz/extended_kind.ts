import type { Question } from "./types.ts";

interface NumberQuestion {
  kind: "number";
  prompt: string;
  answer: number;
}

function expected(question: Question | NumberQuestion): string {
  switch (question.kind) {
    case "choice":
      return question.choices[question.answer];
    case "text":
      return question.answer;
  }
}

console.log(expected({ kind: "number", prompt: "?", answer: 3 }));
