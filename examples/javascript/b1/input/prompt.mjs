import { createInterface } from "node:readline";

const reader = createInterface({ input: process.stdin });
const lines = reader[Symbol.asyncIterator]();

export async function ask(question) {
  process.stdout.write(question);
  const { value } = await lines.next();
  return value ?? "";
}

export function closeInput() {
  reader.close();
}
