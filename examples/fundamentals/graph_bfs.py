from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}


def shortest_path(graph, start, goal):
    parents = {start: None}            # also serves as the visited set
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node == goal:
            break
        for neighbour in graph[node]:
            if neighbour not in parents:
                parents[neighbour] = node
                queue.append(neighbour)
    if goal not in parents:
        return None                    # unreachable
    path = []
    node = goal
    while node is not None:            # walk back to the start
        path.append(node)
        node = parents[node]
    return path[::-1]


path = shortest_path(graph, "A", "E")
print("shortest path:", " -> ".join(path))
print("steps:", len(path) - 1)
