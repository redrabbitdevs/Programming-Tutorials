function parseColor(text) {
  if (!text.startsWith("#") || text.length !== 7) {
    throw new TypeError(`not a colour: ${text}`);
  }
  const [r, g, b] = Uint8Array.fromHex(text.slice(1));
  return { r, g, b };
}

for (const text of ["#ff8800", "#FFFFFF", "ff8800", "#ff880", "#gg0000"]) {
  try {
    console.log(parseColor(text));
  } catch (error) {
    console.log(error.name);
  }
}
