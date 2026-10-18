import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

function tableWriter(table) {
  return new Writable({
    objectMode: true,
    highWaterMark: 2,
    write(row, encoding, callback) {
      setImmediate(() => {
        table.push(row);
        callback();
      });
    },
    final(callback) {
      console.log(`saved ${table.length} rows`);
      callback();
    },
  });
}

async function* rows() {
  for (let id = 1; id <= 5; id++) yield { id, name: `user${id}` };
}

async function* oddOnly(source) {
  for await (const row of source) {
    if (row.id % 2 === 1) yield row;
  }
}

const table = [];
await pipeline(rows, oddOnly, tableWriter(table));
console.log(table.map((row) => row.name));
