function sameKind(a: string | number, b: string | boolean): string {
  if (a === b) {
    return a.toUpperCase();
  }
  return "different";
}

console.log(sameKind("x", "x"), sameKind(1, true));
