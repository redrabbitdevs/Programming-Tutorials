function shout(text: string | undefined): string {
  if (text === undefined) {
    return "(nothing)";
  }
  return text.toUpperCase() + "!";
}

console.log(shout("hi"), shout(undefined));
