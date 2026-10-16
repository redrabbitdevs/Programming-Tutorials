async function save(name) {
  if (name === "bad") throw new Error(`cannot save ${name}`);
  return `saved ${name}`;
}

try {
  console.log(await save("bad"));
} catch (error) {
  console.log("await and try/catch:", error.message);
}

save("bad").catch((error) => console.log(".catch:", error.message));

save("good").then((message) => console.log(message));
