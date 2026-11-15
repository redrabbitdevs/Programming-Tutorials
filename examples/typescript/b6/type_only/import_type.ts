import type { Shape } from "./shapes.ts";
import { area } from "./shapes.ts";

const square: Shape = { w: 4 };
console.log(area(square));
