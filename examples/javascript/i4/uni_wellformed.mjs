const good = "ok \u{1F600}";
const bad = "ok \uD83D";
console.log(good.isWellFormed(), bad.isWellFormed());
console.log(bad.toWellFormed() === "ok �");

try {
  encodeURIComponent(bad);
} catch (error) {
  console.log(error.name);
}
console.log(encodeURIComponent(bad.toWellFormed()));
console.log(JSON.stringify(bad));
