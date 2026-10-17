const busy = (ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // busy: nothing else can run
  }
};

let finished = false;
setTimeout(() => console.log("timer fired, work finished:", finished), 10);

function step(i) {
  busy(10);
  if (i < 9) {
    setImmediate(() => step(i + 1));
  } else {
    finished = true;
    console.log("work done");
  }
}
step(0);
