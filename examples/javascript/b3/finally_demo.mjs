try {
  console.log("parsing");
  JSON.parse("{oops");
  console.log("parsed");
} catch {
  console.log("invalid JSON");
} finally {
  console.log("done");
}
