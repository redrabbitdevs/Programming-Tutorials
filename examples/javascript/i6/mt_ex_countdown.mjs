export function countdown(seconds, onTick, onDone) {
  let remaining = seconds;
  const timer = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      onTick(remaining);
    } else {
      clearInterval(timer);
      onDone();
    }
  }, 1000);
  return () => clearInterval(timer);
}
