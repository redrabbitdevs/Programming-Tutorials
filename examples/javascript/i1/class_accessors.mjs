class Temperature {
  celsius = 0;

  get fahrenheit() {
    return (this.celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.celsius = ((value - 32) * 5) / 9;
  }
}

const t = new Temperature();
t.celsius = 100;
console.log(t.fahrenheit);

t.fahrenheit = 32;
console.log(t.celsius);
console.log(Object.keys(t), "fahrenheit" in t);
