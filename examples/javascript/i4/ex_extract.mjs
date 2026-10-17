const text = `Mail ada@example.com or bob.smith@mail.example.org
before 2026-03-14. The reunion is on 2026-12-01; ignore this: not-an-email@.`;

const emails = text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g);
const dates = text.match(/\b\d{4}-\d{2}-\d{2}\b/g);
console.log(emails);
console.log(dates);
