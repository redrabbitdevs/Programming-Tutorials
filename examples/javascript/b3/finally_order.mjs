console.log("start");
try {
  console.log("in try");
  throw new Error("boom");
} catch (error) {
  console.log("in catch:", error.message);
} finally {
  console.log("in finally");
}
console.log("end");
