// Terminal session from "Security bugs specific to JavaScript".
// Expected transcript: Node 26.11.1.
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node sb_proto.mjs",
  "node --disable-proto=delete sb_proto.mjs",
  "node --disable-proto=throw sb_proto.mjs",
]);
