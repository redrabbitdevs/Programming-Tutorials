function pageSize(requested: number | undefined): number {
  return requested ?? 20;
}

function pageSizeOr(requested: number | undefined): number {
  return requested || 20;
}

console.log(pageSize(0), pageSize(undefined), pageSize(50));
console.log(pageSizeOr(0));
