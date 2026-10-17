const list = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
console.log(list.format(["tea", "coffee", "milk"]));
console.log(list.format(["tea", "coffee"]));
const or = new Intl.ListFormat("en", { type: "disjunction" });
console.log(or.format(["red", "green", "blue"]));
console.log(new Intl.ListFormat("de").format(["Tee", "Kaffee", "Milch"]));

const plural = new Intl.PluralRules("en");
console.log([0, 1, 2, 5].map((n) => plural.select(n)));
const ordinal = new Intl.PluralRules("en", { type: "ordinal" });
console.log([1, 2, 3, 4, 11, 21].map((n) => ordinal.select(n)));

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(rtf.format(-1, "day"), "|", rtf.format(2, "day"));
console.log(rtf.format(-3, "month"));
console.log(new Intl.RelativeTimeFormat("es").format(-2, "hour"));
