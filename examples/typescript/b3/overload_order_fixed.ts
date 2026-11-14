function describe(value: string): "text";
function describe(value: unknown): "anything";
function describe(value: unknown): string {
  return typeof value === "string" ? "text" : "anything";
}

const label: "text" = describe("hello");
console.log(label, describe(3));
