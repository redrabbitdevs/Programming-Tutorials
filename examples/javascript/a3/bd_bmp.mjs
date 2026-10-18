import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

function bmpHeader(width, height) {
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const imageSize = rowSize * height;
  const view = new DataView(new ArrayBuffer(54));
  view.setUint8(0, 0x42); // "B"
  view.setUint8(1, 0x4d); // "M"
  view.setUint32(2, 54 + imageSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  return { header: new Uint8Array(view.buffer), imageSize };
}

const { header, imageSize } = bmpHeader(2, 2);
const file = new Uint8Array(54 + imageSize);
file.set(header);
file.set([0, 0, 255, 0, 255, 0], 54); // bottom row: red, green
file.set([255, 0, 0, 255, 255, 255], 62); // top row: blue, white

const dir = await mkdtemp(join(tmpdir(), "bmp-"));
const path = join(dir, "tiny.bmp");
await writeFile(path, file);

const bytes = await readFile(path);
const info = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
console.log({
  magic: String.fromCharCode(bytes[0], bytes[1]),
  fileSize: info.getUint32(2, true),
  width: info.getInt32(18, true),
  height: info.getInt32(22, true),
  bitsPerPixel: info.getUint16(28, true),
});
await rm(dir, { recursive: true });
