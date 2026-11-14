type Handlers = { onSave?: (id: number) => string };

const handlers: Handlers = {};
const withSave: Handlers = { onSave: (id) => `saved ${id}` };

function firstOf(list: string[] | undefined): string | undefined {
  return list?.[0];
}

console.log(handlers.onSave?.(1), withSave.onSave?.(2));
console.log(firstOf(["x", "y"]), firstOf(undefined));
