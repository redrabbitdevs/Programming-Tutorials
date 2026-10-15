const tree = {
  name: "project",
  children: [
    { name: "README.md" },
    {
      name: "src",
      children: [
        { name: "index.mjs" },
        { name: "util", children: [{ name: "format.mjs" }] },
      ],
    },
  ],
};

function printTree(node, depth = 0) {
  console.log("  ".repeat(depth) + node.name);
  for (const child of node.children ?? []) {
    printTree(child, depth + 1);
  }
}

function countFiles(node) {
  if (!node.children) {
    return 1;
  }
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
}

printTree(tree);
console.log(countFiles(tree));
