graph = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": ["a"]}


def dfs(graph, start):
    seen, order = set(), []

    def visit(node):
        seen.add(node)
        order.append(node)
        for neighbour in graph[node]:
            if neighbour not in seen:
                visit(neighbour)

    visit(start)
    return order


print(dfs(graph, "a"))


def dfs_iterative(graph, start):
    seen, order, stack = set(), [], [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        order.append(node)
        stack.extend(reversed(graph[node]))
    return order


print(dfs_iterative(graph, "a"))
