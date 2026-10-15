export function parseChoice(text, count) {
  const trimmed = text.trim();
  const number = Number(trimmed);
  if (trimmed === "" || !Number.isInteger(number)) return null;
  if (number < 1 || number > count) return null;
  return number - 1;
}

export async function readLine(lines, prompt) {
  process.stdout.write(prompt);
  const { value, done } = await lines.next();
  return done ? null : value;
}

export async function askQuestion(lines, question, number) {
  console.log(`\nQuestion ${number}: ${question.prompt}`);
  question.choices.forEach((choice, i) => console.log(`  ${i + 1}) ${choice}`));

  while (true) {
    const text = await readLine(lines, "Your answer: ");
    if (text === null) return null;
    const picked = parseChoice(text, question.choices.length);
    if (picked !== null) return picked;
    console.log(`Please type a number from 1 to ${question.choices.length}.`);
  }
}
