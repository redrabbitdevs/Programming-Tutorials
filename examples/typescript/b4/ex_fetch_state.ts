type Fetch =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function label(state: Fetch): string {
  switch (state.status) {
    case "idle":
      return "Press start";
    case "loading":
      return "Loading...";
    case "success":
      return `Got ${state.data}`;
    case "error":
      return `Error: ${state.message}`;
  }
}

const states: Fetch[] = [
  { status: "idle" },
  { status: "loading" },
  { status: "success", data: "42 rows" },
  { status: "error", message: "offline" },
];
for (const state of states) {
  console.log(label(state));
}
