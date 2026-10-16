function node(value, left = null, right = null) {
  return { value, left, right };
}

function* inOrder(tree) {
  if (tree === null) {
    return;
  }
  yield* inOrder(tree.left);
  yield tree.value;
  yield* inOrder(tree.right);
}

const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
console.log([...inOrder(tree)].join(" "));
console.log(Math.max(...inOrder(tree)));
console.log(Array.from(inOrder(node(9))));
console.log([...inOrder(null)]);
