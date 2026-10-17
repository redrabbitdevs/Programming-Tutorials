let total = 0;

process.on("message", (command) => {
  if (command.op === "add") total += command.n;
  if (command.op === "quit") {
    process.disconnect();
    return;
  }
  process.send({ total });
});
