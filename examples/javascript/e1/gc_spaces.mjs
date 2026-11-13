import { getHeapSpaceStatistics, getHeapStatistics } from "node:v8";

const names = getHeapSpaceStatistics().map((space) => space.space_name);
for (const name of ["new_space", "old_space", "code_space",
  "large_object_space"]) {
  console.log(name, names.includes(name) ? "present" : "missing");
}

const limit = getHeapStatistics().heap_size_limit / 2 ** 20;
console.log("heap limit:", limit, "MB");
