graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}


def dfs(node, visited, order):
    visited.add(node)
    order.append(node)
    for neighbour in graph[node]:
        if neighbour not in visited:   # without this check, A and B would bounce forever
            dfs(neighbour, visited, order)


order = []
dfs("A", set(), order)
print("DFS order:", order)

# A tree is a graph where each node has one parent: nest the children.
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
