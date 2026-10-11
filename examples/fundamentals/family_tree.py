family = {
    "Rosa": {
        "Mark": {"Ivy": {}, "Joel": {}},
        "Nina": {"Omar": {}},
    }
}


def count_people(tree):
    total = 0
    for children in tree.values():
        total += 1 + count_people(children)
    return total


def depth(tree):
    deepest = 0
    for children in tree.values():
        deepest = max(deepest, depth(children))
    if not tree:
        return 0
    return 1 + deepest


print(count_people(family), depth(family))
