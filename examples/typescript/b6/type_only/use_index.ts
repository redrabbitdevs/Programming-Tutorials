import { area, type Id, type Shape } from "./shapes_index.ts";

const id: Id = 7;
const square: Shape = { w: 2 };
console.log(id, area(square));
