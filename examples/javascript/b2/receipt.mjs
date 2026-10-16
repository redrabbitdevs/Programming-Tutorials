const total1 = (2 * 3.5).toFixed(2);
const total2 = (1 * 4.25).toFixed(2);
const total3 = (12 * 0.4).toFixed(2);

console.log("Tea".padEnd(8) + "2".padStart(3) + total1.padStart(8));
console.log("Cake".padEnd(8) + "1".padStart(3) + total2.padStart(8));
console.log("Biscuit".padEnd(8) + "12".padStart(3) + total3.padStart(8));
