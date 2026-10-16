function* lines() {
  try {
    yield "first";
    yield "second";
    yield "third";
  } finally {
    console.log("source closed");
  }
}

const found = lines().take(2).toArray();
console.log(found);

const all = lines().toArray();
console.log(all.length);
