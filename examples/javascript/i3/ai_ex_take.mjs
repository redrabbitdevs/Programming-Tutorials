async function* ids() {
  let id = 1;
  try {
    while (true) {
      yield id++;
    }
  } finally {
    console.log("source closed");
  }
}

async function* take(count, source) {
  if (count <= 0) return;
  let taken = 0;
  for await (const value of source) {
    yield value;
    if (++taken === count) return;
  }
}

for await (const id of take(3, ids())) {
  console.log("id", id);
}
console.log("done");
