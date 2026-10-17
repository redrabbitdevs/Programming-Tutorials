const path = (strings, ...values) =>
  strings.reduce(
    (out, text, i) => out + encodeURIComponent(values[i - 1]) + text,
  );

const user = "ada lovelace";
const file = "notes/2026.txt";
const version = 2;
console.log(path`/users/${user}/files/${file}?v=${version}`);
