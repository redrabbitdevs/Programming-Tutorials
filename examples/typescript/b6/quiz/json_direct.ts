import raw from "./questions.json" with { type: "json" };
import type { Question } from "./types.ts";

const questions: Question[] = raw;
console.log(questions.length);
