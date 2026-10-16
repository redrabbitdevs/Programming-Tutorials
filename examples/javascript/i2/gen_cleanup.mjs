function* reader() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("closed");
  }
}

for (const n of reader()) {
  console.log("read", n);
  if (n === 2) {
    break;
  }
}

const [first] = reader();
console.log("first:", first);
