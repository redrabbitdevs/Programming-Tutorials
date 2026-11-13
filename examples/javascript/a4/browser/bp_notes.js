import { load, save } from "./bp_storage.js";

const list = document.querySelector("#notes");
let notes = load("notes", []);

function render() {
  list.replaceChildren(...notes.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

document.querySelector("#add").addEventListener("submit", (event) => {
  event.preventDefault();
  notes = [...notes, event.target.elements.text.value];
  save("notes", notes);
  event.target.reset();
  render();
});

render();
navigator.serviceWorker?.register("./bp_sw.js");
