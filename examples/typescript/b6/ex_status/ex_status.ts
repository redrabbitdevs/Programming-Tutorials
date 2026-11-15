type Status = "active" | "suspended" | "closed";

function describe(status: Status): string {
  switch (status) {
    case "active":
      return "active";
    case "suspended":
      return "suspended";
    case "closed":
      return "closed";
  }
}

console.log(describe("suspended"));
