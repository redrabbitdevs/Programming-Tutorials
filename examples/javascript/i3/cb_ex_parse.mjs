function parseJson(text, callback) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    return callback(error);
  }
  callback(null, data);
}

try {
  parseJson('{"a":1}', (error, data) => {
    console.log("callback got", error ? error.message : data);
    throw new Error("handler failed");
  });
} catch (error) {
  console.log("outside:", error.message);
}
parseJson("{oops", (error) => console.log("bad json:", error.name));
