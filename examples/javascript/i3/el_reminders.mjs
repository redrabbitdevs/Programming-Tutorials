function later(ms, message) {
  const id = setTimeout(() => console.log(message), ms);
  return () => clearTimeout(id);
}

later(10, "first");
const cancelSecond = later(20, "second");
later(30, "third");
cancelSecond();
console.log("scheduled three, cancelled one");
