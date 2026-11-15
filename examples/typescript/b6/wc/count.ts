export interface Counts {
  lines: number;
  words: number;
  bytes: number;
}

export function count(text: string): Counts {
  const lines = text.split("\n").length - 1;
  const words = text.split(/\s+/).filter((word) => word !== "").length;
  return { lines, words, bytes: Buffer.byteLength(text) };
}
