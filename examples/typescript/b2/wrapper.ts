function shout(text: string): string {
  return text.toUpperCase() + "!";
}

const boxed: String = new String("hi");
console.log(shout(boxed));
