import type { Question } from "./types.ts";

export type Grade = "correct" | "wrong" | "invalid";

export function grade(question: Question, text: string): Grade {
  const typed = text.trim();
  if (typed === "") {
    return "invalid";
  }
  switch (question.kind) {
    case "choice": {
      const number = Number(typed);
      if (!Number.isInteger(number)) return "invalid";
      if (number < 1 || number > question.choices.length) return "invalid";
      return number - 1 === question.answer ? "correct" : "wrong";
    }
    case "text": {
      const same = typed.toLowerCase() === question.answer.toLowerCase();
      return same ? "correct" : "wrong";
    }
  }
}
