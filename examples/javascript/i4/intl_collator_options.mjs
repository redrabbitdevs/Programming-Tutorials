const base = new Intl.Collator("en", { sensitivity: "base" });
const accent = new Intl.Collator("en", { sensitivity: "accent" });
console.log(base.compare("a", "A"), base.compare("a", "á"));
console.log(accent.compare("a", "A"), accent.compare("a", "á"));

const letters = ["z", "ä", "a"];
console.log([...letters].sort(new Intl.Collator("de").compare));
console.log([...letters].sort(new Intl.Collator("sv").compare));
console.log("a".localeCompare("B", "en"));
