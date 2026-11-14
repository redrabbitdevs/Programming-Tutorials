type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

const both: FetchState = {
  status: "success",
  data: ["a"],
  message: "also failed",
};

const empty: FetchState = { status: "success" };

console.log(both, empty);
