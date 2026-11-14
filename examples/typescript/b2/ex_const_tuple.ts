const sizes = ["small", "medium", "large"] as const;

function pick(size: "small" | "medium" | "large"): string {
  return `you chose ${size}`;
}

console.log(pick(sizes[1]));
