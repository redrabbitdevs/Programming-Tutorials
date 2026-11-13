import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const equal = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

const dir = await mkdtemp(join(tmpdir(), "b64-"));
const path = join(dir, "all-bytes.bin");
await writeFile(path, Uint8Array.from({ length: 256 }, (_, i) => i));

const original = await readFile(path);
const base64 = original.toBase64();
const hex = original.toHex();
console.log(`base64: ${base64.length} characters`);
console.log(`hex: ${hex.length} characters`);
console.log(hex.slice(0, 32));

const fromBase64 = Uint8Array.fromBase64(base64);
const fromHex = Uint8Array.fromHex(hex);
console.log(equal(fromBase64, original), equal(fromHex, original));
await rm(dir, { recursive: true });
