import { readFile } from "node:fs/promises";

const url = new URL("./settings.json", import.meta.url);
export const settings = JSON.parse(await readFile(url, "utf8"));
