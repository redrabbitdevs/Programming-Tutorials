class Even {
  static [Symbol.hasInstance](value) {
    return Number.isInteger(value) && value % 2 === 0;
  }
}

console.log(4 instanceof Even, 3 instanceof Even, "4" instanceof Even);
