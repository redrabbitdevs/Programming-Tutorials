interface Formatter {
  format(value: number): string;
}

class Fixed implements Formatter {
  format(value) {
    return value.toFixed(2);
  }
}

console.log(new Fixed().format(3));
