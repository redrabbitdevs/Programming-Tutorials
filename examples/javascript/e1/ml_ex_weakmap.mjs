import { writeHeapSnapshot } from "node:v8";

class Widget {
  constructor(id) {
    this.id = id;
  }
}

const strongInfo = new Map();
const weakInfo = new WeakMap();

function showWidgets(info) {
  const widgets = Array.from({ length: 1000 }, (_, i) => new Widget(i));
  for (const w of widgets) info.set(w, { label: "w" + w.id });
}

showWidgets(process.argv[2] === "weak" ? weakInfo : strongInfo);
writeHeapSnapshot("widgets.heapsnapshot");
console.log("widgets are off screen");
