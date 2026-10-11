family = {
    "Rosa": {
        "Mark": {"Ivy": {}, "Joel": {}},
        "Nina": {"Omar": {}},
    }
}


def count_people(tree):
    return sum(1 + count_people(children) for children in tree.values())


def depth(tree):
    if not tree:
        return 0
    return 1 + max(depth(children) for children in tree.values())


print(count_people(family), depth(family))
