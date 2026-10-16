async function* lines() {
  try {
    yield "a";
    yield "b";
    yield "c";
  } finally {
    console.log("cleanup: closing the resource");
  }
}

for await (const line of lines()) {
  console.log(line);
  if (line === "b") break;
}
console.log("loop exited");
