type NameRequired = { name: string | undefined };
type NameOptional = { name?: string };

const a: NameOptional = {};
const b: NameRequired = { name: undefined };
const c: NameRequired = {};

console.log(a, b, c);
