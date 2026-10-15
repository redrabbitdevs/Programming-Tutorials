function readValue(text) {
  try {
    console.log("parsing", text);
    return JSON.parse(text);
  } catch {
    console.log("invalid JSON");
    return null;
  } finally {
    console.log("done with", text);
  }
}

console.log(readValue('{"ok": true}'));
console.log(readValue("{oops"));

function finallyWins() {
  try {
    return "from try";
  } finally {
    console.log("finally runs before the function returns");
  }
}
console.log(finallyWins());
