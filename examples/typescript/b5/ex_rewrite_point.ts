class Pair {
  first: string;
  second: string;

  constructor(first: string, second: string) {
    this.first = first;
    this.second = second;
  }

  swap(): Pair {
    return new Pair(this.second, this.first);
  }
}

const swapped = new Pair("a", "b").swap();
console.log(swapped.first, swapped.second);
