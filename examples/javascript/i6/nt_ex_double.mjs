export async function doubleLater(value) {
  await new Promise((resolve) => setTimeout(resolve, 2));
  if (typeof value !== "number") throw new TypeError("number expected");
  return value * 2;
}
