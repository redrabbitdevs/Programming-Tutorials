// Edits (insert, delete, replace, swap two neighbours) that turn a into b.
function distance(a, b) {
  const d = [];
  for (let i = 0; i <= a.length; i++) {
    d.push([i]);
    for (let j = 1; j <= b.length; j++) d[i][j] = i === 0 ? j : 0;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost);
      const swapped = a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1];
      if (i > 1 && j > 1 && swapped) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

const popular = ["express", "lodash", "react", "chalk", "commander", "axios"];
const normalise = (name) => name.replace(/[-_.]/g, "").toLowerCase();

// The popular package a name imitates, or null.
function imitates(name) {
  if (popular.includes(name)) return null;
  return popular.find((p) => normalise(p) === normalise(name) ||
    distance(name, p) === 1) ?? null;
}

const names = ["expres", "lodahs", "react", "react-dom", "c-halk", "axois",
  "commanders", "vite"];
for (const name of names) console.log(name.padEnd(11), imitates(name) ?? "-");
