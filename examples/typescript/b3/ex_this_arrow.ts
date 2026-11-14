class Timer {
  seconds = 0;
  tick = () => {
    this.seconds += 1;
  };
}

const timer = new Timer();
const tick = timer.tick;
tick();
tick();
tick();
console.log(timer.seconds);
