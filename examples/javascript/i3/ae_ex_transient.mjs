const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(task, tries = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await task(attempt);
    } catch (error) {
      if (!error.transient || attempt === tries) throw error;
      console.log(`transient failure on attempt ${attempt}, retrying`);
      await sleep(5);
    }
  }
}

function transient(message) {
  return Object.assign(new Error(message), { transient: true });
}

const timesOut = async (attempt) => {
  if (attempt < 3) throw transient("timeout");
  return "finally answered";
};
const badRequest = async () => {
  throw new Error("bad request");
};

console.log(await retry(timesOut));
await retry(badRequest).catch((error) => {
  console.log("no retry:", error.message);
});
