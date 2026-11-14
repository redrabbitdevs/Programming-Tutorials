const mixed: (string | number)[] = [1, "two", 3];
mixed.push("four");

const either: string[] | number[] = ["a", "b"];

console.log(mixed, either);
