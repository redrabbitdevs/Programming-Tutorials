let next = 1;
const numbers = new ReadableStream(
  {
    pull(controller) {
      console.log(`pull, desiredSize ${controller.desiredSize}`);
      controller.enqueue(next++);
      if (next > 4) controller.close();
    },
  },
  new CountQueuingStrategy({ highWaterMark: 2 }),
);

await new Promise((resolve) => setImmediate(resolve));
console.log("nothing read yet");

const reader = numbers.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log("  read", value);
}
