console.log("start");

function open(name) {
  return { name, [Symbol.dispose]: () => console.log("closed", name) };
}

{
  using file = open("a.txt");
  console.log("using", file.name);
}
