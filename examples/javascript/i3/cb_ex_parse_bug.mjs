function parseJson(text, callback) {
  try {
    callback(null, JSON.parse(text));
  } catch (error) {
    callback(error);
  }
}

try {
  parseJson('{"a":1}', (error, data) => {
    console.log("callback got", error ? error.message : data);
    throw new Error("handler failed");
  });
} catch (error) {
  console.log("outside:", error.message);
}
