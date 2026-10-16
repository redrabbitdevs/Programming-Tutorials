const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function load(name) {
  await sleep(5);
  if (name === "missing") throw new Error(`no config named ${name}`);
  return { name, retries: 3 };
}

for (const name of ["app", "missing"]) {
  try {
    const config = await load(name);
    console.log("loaded", config);
  } catch (error) {
    console.log("error:", error.message);
  } finally {
    console.log("done with", name);
  }
}
