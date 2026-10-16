let ticks = 0;
const id = setInterval(() => {
  ticks += 1;
  console.log("tick", ticks);
  if (ticks === 3) {
    clearInterval(id);
    console.log("stopped");
  }
}, 10);
console.log("interval started");
