console.log(Number("42"), Number("  7 "), Number(""), Number("12px"));
console.log(Number(true), Number(null), Number(undefined));
console.log(Number([]), Number([5]), Number([1, 2]));
console.log(String(123), String(null), String(undefined), String(true));
console.log(String([1, 2]), String({}));
console.log(Boolean(""), Boolean("0"), Boolean([]), Boolean(null));
console.log(+"8", `${5}`, 5 + "");
