export function confirmDialog(message) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  form.method = "dialog";
  const text = document.createElement("p");
  text.textContent = message;
  const cancel = Object.assign(document.createElement("button"),
    { value: "cancel", textContent: "Cancel", autofocus: true });
  const ok = Object.assign(document.createElement("button"),
    { value: "ok", textContent: "OK" });
  form.append(text, cancel, ok);
  dialog.append(form);
  document.body.append(dialog);

  return new Promise((resolve) => {
    dialog.addEventListener("close", () => {
      resolve(dialog.returnValue === "ok");
      dialog.remove();
    }, { once: true });
    dialog.showModal();
  });
}
