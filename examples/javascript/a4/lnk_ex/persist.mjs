import { mkdtemp, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function saveLinks(path, links) {
  const temporary = `${path}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(links, null, 2));
  await rename(temporary, path);
}

export async function loadLinks(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

const dir = await mkdtemp(join(tmpdir(), "lnk-"));
const path = join(dir, "links.json");
try {
  console.log(await loadLinks(path));
  await saveLinks(path, [
    { code: "g8", url: "https://example.com/", visits: 0 },
    { code: "g9", url: "https://example.org/", visits: 2 },
  ]);
  console.log((await loadLinks(path)).map((link) => link.code));
  console.log(await readdir(dir));
} finally {
  await rm(dir, { recursive: true });
}
