const penTotal = (3 * 1.2).toFixed(2);
const bookTotal = (10 * 2.5).toFixed(2);

console.log("Item".padEnd(10) + "Qty".padStart(5) + "Total".padStart(8));
console.log("Pen".padEnd(10) + "3".padStart(5) + penTotal.padStart(8));
console.log("Notebook".padEnd(10) + "10".padStart(5) + bookTotal.padStart(8));
