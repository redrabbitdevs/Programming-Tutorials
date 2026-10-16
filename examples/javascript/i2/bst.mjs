function insert(node, value) {
  if (node === null) {
    return { value, left: null, right: null };
  }
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else {
    node.right = insert(node.right, value);
  }
  return node;
}

function contains(node, value) {
  if (node === null) {
    return false;
  }
  if (value === node.value) {
    return true;
  }
  return contains(value < node.value ? node.left : node.right, value);
}

function height(node) {
  if (node === null) {
    return 0;
  }
  return 1 + Math.max(height(node.left), height(node.right));
}

let root = null;
for (const n of [5, 2, 8, 1, 9, 3]) {
  root = insert(root, n);
}
console.log(contains(root, 3), contains(root, 7), height(root));
console.log(root.left.value, root.right.value);
