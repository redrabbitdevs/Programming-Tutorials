import add from "mathy/add";
import mul from "mathy/mul";

console.log(add(2, 3), mul(2, 3));
await import("mathy/missing").catch((e) => console.log(e.code));
