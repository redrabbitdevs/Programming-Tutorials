export function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i + size <= array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
