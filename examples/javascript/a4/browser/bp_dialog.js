const dialog = document.querySelector("#confirm");
const status = document.querySelector("#status");

document.querySelector("#delete").addEventListener("click", () => {
  dialog.returnValue = "";
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  status.textContent =
    dialog.returnValue === "delete" ? "Deleted." : "Kept.";
});
