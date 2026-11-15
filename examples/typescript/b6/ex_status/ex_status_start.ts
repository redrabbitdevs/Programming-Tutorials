enum Status {
  Active,
  Suspended,
  Closed,
}

function describe(status: Status): string {
  switch (status) {
    case Status.Active:
      return "active";
    case Status.Suspended:
      return "suspended";
    case Status.Closed:
      return "closed";
  }
}

console.log(describe(Status.Suspended));
