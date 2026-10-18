const settle = () => new Promise((resolve) => setImmediate(resolve));
const saved = [];

const slowSink = new WritableStream(
  {
    async write(chunk) {
      await settle();
      saved.push(chunk);
    },
  },
  new CountQueuingStrategy({ highWaterMark: 2 }),
);

const writer = slowSink.getWriter();
for (let n = 1; n <= 5; n++) {
  await writer.ready;
  console.log(`write ${n}, desiredSize ${writer.desiredSize}`);
  writer.write(n);
}
await writer.close();
console.log("saved:", saved);
