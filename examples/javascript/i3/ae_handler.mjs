process.on("unhandledRejection", (reason) => {
  console.log("unhandled:", reason.message);
});

async function save() {
  throw new Error("disk full");
}

save();
console.log("program keeps going");
setTimeout(() => console.log("timer still runs"), 10);
