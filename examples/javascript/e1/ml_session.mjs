// Terminal sessions from "Finding memory leaks", checked against real runs.
// Expected transcript: Node 26.11.1 (V8 14.6).
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node ml_leak.mjs",
  "node ml_count.mjs leak.heapsnapshot Session",
  "node ml_fixed.mjs",
  "node ml_count.mjs fixed.heapsnapshot Session",
  "rm leak.heapsnapshot fixed.heapsnapshot",
  "node --heap-prof --heap-prof-dir=prof ml_heapprof.mjs",
  "node ml_top.mjs prof/*.heapprofile",
  "rm -r prof",
  "node --heap-prof --heap-prof-dir=prof --no-turbo-inlining --no-maglev-inlining ml_heapprof.mjs",
  "node ml_top.mjs prof/*.heapprofile",
  "rm -r prof",
  "node ml_ex_cache.mjs",
  "node ml_count.mjs cache.heapsnapshot Result",
  "node ml_ex_timer.mjs leak",
  "node ml_count.mjs timer.heapsnapshot Connection",
  "node ml_ex_timer.mjs",
  "node ml_count.mjs timer.heapsnapshot Connection",
  "node ml_ex_weakmap.mjs",
  "node ml_count.mjs widgets.heapsnapshot Widget",
  "node ml_ex_weakmap.mjs weak",
  "node ml_count.mjs widgets.heapsnapshot Widget",
  "rm cache.heapsnapshot timer.heapsnapshot widgets.heapsnapshot",
]);
