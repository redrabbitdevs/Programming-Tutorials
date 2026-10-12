from collections import deque

graph = {
    "home": ["shop", "park"],
    "shop": ["home", "bank"],
    "park": ["home", "lake"],
    "bank": ["shop", "lake"],
    "lake": ["park", "bank", "hill"],
    "hill": ["lake"],
}
print(graph["lake"], len(graph))


def shortest_path(graph, start, goal):
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
    return None


print(shortest_path(graph, "home", "hill"))
print(shortest_path(graph, "shop", "park"))
