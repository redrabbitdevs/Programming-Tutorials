const busy = (ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // busy: nothing else can run
  }
};

let finished = false;
setTimeout(() => console.log("timer fired, work finished:", finished), 10);

for (let i = 0; i < 10; i++) busy(10);
finished = true;
console.log("work done");
