const parsed: unknown = JSON.parse("42");

if (typeof parsed === "number") {
  console.log(parsed * 2);
}
