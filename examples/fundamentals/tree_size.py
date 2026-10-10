def total_size(node):
    if isinstance(node, int):
        return node
    return sum(total_size(child) for child in node.values())


tree = {"a.txt": 10, "docs": {"b.txt": 20, "old": {"c.txt": 5}}}
print(total_size(tree))
