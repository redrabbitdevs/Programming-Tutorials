import path from "node:path";

type Direction = "UP" | "DOWN";

const format = {
  label(text: string): string {
    return `[${text}]`;
  },
};

class Tag {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const raw: unknown = "notes/today.txt";
const file = raw as string;
const up: Direction = "UP";
const tag = new Tag(up);

console.log(format.label(path.basename(file)), tag.name);
