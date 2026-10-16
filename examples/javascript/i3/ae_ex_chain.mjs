function trace(error) {
  const messages = [];
  for (let e = error; e; e = e.cause) {
    messages.push(e.message);
  }
  return messages;
}

function readFile() {
  throw new Error("file not found");
}

function loadConfig() {
  try {
    readFile();
  } catch (error) {
    throw new Error("cannot load config", { cause: error });
  }
}

function startApp() {
  try {
    loadConfig();
  } catch (error) {
    throw new Error("cannot start app", { cause: error });
  }
}

try {
  startApp();
} catch (error) {
  console.log(trace(error));
}
