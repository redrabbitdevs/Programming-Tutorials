function shout(text: string): string {
  return text.toUpperCase() + "!";
}

const plain: string = "hi";
console.log(shout(plain));
