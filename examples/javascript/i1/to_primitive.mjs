class Duration {
  constructor(seconds) {
    this.seconds = seconds;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      const minutes = Math.floor(this.seconds / 60);
      return `${minutes}m ${this.seconds % 60}s`;
    }
    return this.seconds;
  }
}

const d = new Duration(90);
console.log(`${d}`, String(d));
console.log(+d, d * 2, d > 60);
console.log(d + 10, `${d}` + "!");
