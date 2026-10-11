tree = {
    "readme.txt": 5,
    "logo.png": 40,
    "src": {
        "main.py": 20,
        "util.py": 12,
        "tests": {"test_main.py": 8},
    },
}


def total_size(node):
    if isinstance(node, int):  # base case: a file
        return node
    return sum(total_size(child) for child in node.values())  # a folder


print("total size:", total_size(tree))
