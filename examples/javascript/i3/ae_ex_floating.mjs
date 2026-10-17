async function cleanup() {
  throw new Error("disk busy");
}

try {
  await cleanup();
} catch (error) {
  console.log("cleanup failed:", error.message);
}
console.log("shutdown complete");
