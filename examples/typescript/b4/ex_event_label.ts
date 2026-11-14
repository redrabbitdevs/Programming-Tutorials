type AppEvent =
  | { type: "click"; x: number; y: number }
  | { type: "key"; key: string }
  | { type: "scroll"; delta: number };

function label(event: AppEvent): string {
  switch (event.type) {
    case "click":
      return `click at ${event.x},${event.y}`;
    case "key":
      return `key ${event.key}`;
    case "scroll":
      return `scroll ${event.delta}`;
    default:
      event satisfies never;
      throw new Error("unreachable");
  }
}

console.log(label({ type: "click", x: 3, y: 4 }));
console.log(label({ type: "key", key: "a" }));
console.log(label({ type: "scroll", delta: -2 }));
