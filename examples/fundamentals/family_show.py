family = {
    "Rosa": {
        "Mark": {"Ivy": {}, "Joel": {}},
        "Nina": {"Omar": {}},
    }
}


def show(tree, depth=0):
    for name, children in tree.items():
        print("  " * depth + name)
        show(children, depth + 1)


show(family)
