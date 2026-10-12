import heapq


def dijkstra(graph, start):
    dist = {start: 0}
    previous = {start: None}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]:
            continue
        for neighbour, weight in graph[node].items():
            new = d + weight
            if new < dist.get(neighbour, float("inf")):
                dist[neighbour] = new
                previous[neighbour] = node
                heapq.heappush(heap, (new, neighbour))
    return dist, previous

roads = {
    "A": {"B": 4, "C": 1},
    "B": {"D": 1},
    "C": {"B": 2, "D": 5},
    "D": {},
}

dist, previous = dijkstra(roads, "A")
for town in sorted(dist):
    print(town, dist[town])

path, node = [], "D"
while node is not None:
    path.append(node)
    node = previous[node]
print("path:", " -> ".join(reversed(path)))
