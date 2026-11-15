import type { Question } from "../quiz/types.ts";

function shuffle(
  list: readonly Question[],
  random: () => number = Math.random,
): Question[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const original: Question[] = [
  { kind: "text", prompt: "A", answer: "a" },
  { kind: "text", prompt: "B", answer: "b" },
  { kind: "text", prompt: "C", answer: "c" },
];

const fixed = shuffle(original, () => 0);
console.log(fixed.map((q) => q.prompt).join(" "));
console.log(original.map((q) => q.prompt).join(" "));
