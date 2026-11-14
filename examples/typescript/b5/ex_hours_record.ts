type Day = "mon" | "tue" | "wed";

const hours: Record<Day, number> = { mon: 8, tue: 6, wed: 7 };

let total = 0;
for (const day of ["mon", "tue", "wed"] as const) {
  total += hours[day];
}
console.log(total);
