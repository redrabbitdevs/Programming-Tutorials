const source = new ReadableStream({
  start(controller) {
    controller.enqueue("a");
    controller.enqueue("b");
    controller.close();
  },
});
const shout = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

for await (const chunk of source.pipeThrough(shout)) {
  console.log(chunk);
}
