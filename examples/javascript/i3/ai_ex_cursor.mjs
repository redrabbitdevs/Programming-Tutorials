const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const database = { start: ["a", "b"], p2: ["c", "d"], p3: ["e"] };
const nextOf = { start: "p2", p2: "p3", p3: null };

async function fetchChunk(cursor) {
  await sleep(5);
  return { data: database[cursor], nextCursor: nextOf[cursor] };
}

async function* allData() {
  let cursor = "start";
  while (cursor !== null) {
    const chunk = await fetchChunk(cursor);
    yield* chunk.data;
    cursor = chunk.nextCursor;
  }
}

const all = await Array.fromAsync(allData());
console.log(all, "total:", all.length);
