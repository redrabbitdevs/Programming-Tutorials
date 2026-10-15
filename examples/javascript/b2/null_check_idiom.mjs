function isMissing(value) {
  return value == null;
}

console.log(isMissing(null), isMissing(undefined));
console.log(isMissing(0), isMissing(""), isMissing(false), isMissing(NaN));
