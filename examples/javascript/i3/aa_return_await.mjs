const failLater = async () => {
  throw new Error("inner failure");
};

async function withoutAwait() {
  try {
    return failLater();
  } catch {
    return "caught inside";
  }
}

async function withAwait() {
  try {
    return await failLater();
  } catch {
    return "caught inside";
  }
}

console.log(await withAwait());
await withoutAwait().catch((e) => console.log("escaped:", e.message));
