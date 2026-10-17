import type { User } from "./tj_types.ts";
import { greet } from "./tj_greet.ts";

type Id = number | string;

interface Options {
  loud?: boolean;
}

const user: User = { id: 1, name: "Ada" };

function describe(id: Id, options: Options = {}): string {
  const text = `${greet(user.name)} (#${id})`;
  return options.loud ? text.toUpperCase() : text;
}

console.log(describe(user.id));
console.log(describe("x", { loud: true }));
