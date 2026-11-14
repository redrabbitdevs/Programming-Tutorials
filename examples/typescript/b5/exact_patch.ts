interface Patch {
  theme?: string | undefined;
}

function apply(current: string, patch: Patch): string {
  if (!("theme" in patch)) {
    return current;
  }
  return patch.theme ?? "default";
}

console.log(apply("dark", {}));
console.log(apply("dark", { theme: "light" }));
console.log(apply("dark", { theme: undefined }));
