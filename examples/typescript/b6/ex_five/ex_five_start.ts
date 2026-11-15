import path = require("node:path");

enum Direction {
  Up = "UP",
  Down = "DOWN",
}

namespace Format {
  export function label(text: string): string {
    return `[${text}]`;
  }
}

class Tag {
  constructor(public name: string) {}
}

const raw: unknown = "notes/today.txt";
const file = <string>raw;
const tag = new Tag(Direction.Up);

console.log(Format.label(path.basename(file)), tag.name);
