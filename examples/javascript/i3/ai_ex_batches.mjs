async function* numbers() {
  for (let i = 1; i <= 7; i++) yield i;
}

async function* batches(source, size) {
  let batch = [];
  for await (const value of source) {
    batch.push(value);
    if (batch.length === size) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) yield batch;
}

for await (const batch of batches(numbers(), 3)) {
  console.log(batch);
}
