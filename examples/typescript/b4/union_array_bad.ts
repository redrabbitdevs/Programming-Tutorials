function add(list: string[] | number[]): void {
  list.push("c");
}

const letters = ["a", "b"];
add(letters);
console.log(letters);
