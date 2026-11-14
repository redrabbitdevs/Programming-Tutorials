type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: FetchState): string {
  if (state.status === "success") {
    return `${state.data.length} items`;
  }
  if (state.status === "error") {
    return `failed: ${state.message}`;
  }
  return state.status;
}

console.log(render({ status: "success", data: ["a", "b"] }));
console.log(render({ status: "error", message: "timeout" }));
console.log(render({ status: "loading" }));
