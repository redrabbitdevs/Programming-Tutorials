async function cleanup() {
  throw new Error("disk busy");
}

process.on("unhandledRejection", (reason) => {
  console.log("lost error:", reason.message);
});

cleanup();
console.log("shutdown complete");
