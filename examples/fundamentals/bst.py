class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    return node                        # equal values are ignored


def contains(node, value):
    if node is None:
        return False
    if value == node.value:
        return True
    return contains(node.left if value < node.value else node.right, value)


def in_order(node, out):
    if node is not None:
        in_order(node.left, out)       # left subtree
        out.append(node.value)         # the node itself
        in_order(node.right, out)      # right subtree


def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


root = None
for v in [5, 3, 8, 1, 4, 7, 9]:
    root = insert(root, v)

values = []
in_order(root, values)
print("in order:", " ".join(map(str, values)))
print("contains 4:", "yes" if contains(root, 4) else "no")
print("contains 6:", "yes" if contains(root, 6) else "no")
print("height:", height(root))
