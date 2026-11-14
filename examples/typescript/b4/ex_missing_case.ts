type Fruit = "apple" | "pear" | "plum" | "cherry";

function color(fruit: Fruit): string {
  switch (fruit) {
    case "apple":
      return "red";
    case "pear":
      return "green";
    case "plum":
      return "purple";
    case "cherry":
      return "dark red";
  }
}

console.log(color("apple"), color("cherry"));
