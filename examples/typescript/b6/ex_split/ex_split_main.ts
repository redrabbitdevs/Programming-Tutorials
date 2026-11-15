import { report } from "./format.ts";
import { average } from "./stats.ts";

const grades: number[] = [70, 85, 90];

console.log(report("Ada", average(grades)));
