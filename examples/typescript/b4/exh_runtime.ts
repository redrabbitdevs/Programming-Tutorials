function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function signal(light: "red" | "green"): string {
  if (light === "red") return "stop";
  if (light === "green") return "go";
  return assertNever(light);
}

const fromOutside: unknown = JSON.parse('"blue"');
try {
  console.log(signal(fromOutside as "red"));
} catch (error) {
  console.log(String(error));
}
