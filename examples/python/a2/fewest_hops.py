from collections import deque


def fewest_hops(graph, start, goal):
    previous = {start: None}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node == goal:
            path = []
            while node is not None:
                path.append(node)
                node = previous[node]
            return path[::-1]
        for neighbour in graph[node]:
            if neighbour not in previous:
                previous[neighbour] = node
                queue.append(neighbour)


graph = {"a": ["e", "b"], "b": ["c"], "c": ["d"], "d": ["f"],
         "e": ["f"], "f": []}
path = fewest_hops(graph, "a", "f")
print(path, len(path) - 1, "hops")
