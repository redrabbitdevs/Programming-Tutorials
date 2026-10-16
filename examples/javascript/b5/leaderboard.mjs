const players = [
  { name: "Ada", score: 90, seconds: 50 },
  { name: "Grace", score: 95, seconds: 70 },
  { name: "Linus", score: 90, seconds: 45 },
  { name: "Alan", score: 95, seconds: 70 },
  { name: "Barbara", score: 80, seconds: 30 },
];

const ranked = players.toSorted(
  (a, b) =>
    b.score - a.score ||
    a.seconds - b.seconds ||
    a.name.localeCompare(b.name, "en"),
);

for (const p of ranked) {
  console.log(p.name, p.score, p.seconds);
}
console.log(players[0].name);
