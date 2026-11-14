type Day = "mon" | "tue" | "wed";

const hours: Record<Day, number> = { mon: 8, tue: 6, wed: 7 };
const lengths: Record<string, number> = { short: 3, longer: 6 };

console.log(hours.tue, lengths.longer);
