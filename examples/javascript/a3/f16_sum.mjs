const readings = new Float16Array(4000).fill(1);

const total16 = new Float16Array(1);
for (const r of readings) total16[0] += r;

let total64 = 0;
for (const r of readings) total64 += r;

console.log(total16[0], total64);
