const history = [];

function recordRequest(i) {
  history.push({ id: i, body: "x".repeat(200) + i });
}

function renderPage(i) {
  return ["<li>", String(i), "</li>"].join("");
}

for (let i = 0; i < 200_000; i++) {
  recordRequest(i);
  renderPage(i);
}
console.log("requests:", history.length);
