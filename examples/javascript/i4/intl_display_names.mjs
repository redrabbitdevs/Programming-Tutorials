const regions = new Intl.DisplayNames("en", { type: "region" });
const languages = new Intl.DisplayNames("de", { type: "language" });
const currencies = new Intl.DisplayNames("en", { type: "currency" });
const frenchRegions = new Intl.DisplayNames("fr", { type: "region" });

console.log(regions.of("DE"), regions.of("JP"));
console.log(languages.of("en"), languages.of("ja"));
console.log(currencies.of("EUR"), frenchRegions.of("US"));
