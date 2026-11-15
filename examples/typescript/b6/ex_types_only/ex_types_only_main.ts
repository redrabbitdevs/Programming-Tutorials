import { toggle } from "./model.ts";
import type { Light } from "./model_types.ts";

const light: Light = { on: false };
console.log(toggle(light));
