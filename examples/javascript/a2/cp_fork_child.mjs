process.on("message", (job) => {
  const words = job.text.split(/\s+/).filter(Boolean);
  process.send({ id: job.id, words: words.length });
});
