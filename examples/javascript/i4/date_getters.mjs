const d = new Date(Date.UTC(2026, 2, 14, 15, 30, 45, 120));

console.log(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
console.log(d.getUTCDay(), d.getUTCHours(), d.getUTCMinutes());
console.log(d.getUTCSeconds(), d.getUTCMilliseconds());

const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
console.log(names[d.getUTCDay()]);

console.log(d.getYear());
console.log(d.getUTCFullYear() - 1900 === d.getYear());
