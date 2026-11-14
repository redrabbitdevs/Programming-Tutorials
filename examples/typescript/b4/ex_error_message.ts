function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown);
}

try {
  throw new Error("first");
} catch (error) {
  console.log(messageOf(error));
}

try {
  throw "second";
} catch (error) {
  console.log(messageOf(error));
}
