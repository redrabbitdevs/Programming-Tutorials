import heapq
from itertools import count

heap = []
for n in [5, 1, 8, 3, 2]:
    heapq.heappush(heap, n)
print(heap[0], heap)
print([heapq.heappop(heap) for _ in range(3)], heap)

tasks = []
order = count()
for priority, name in [(2, "write"), (1, "fix bug"), (2, "review")]:
    heapq.heappush(tasks, (priority, next(order), name))

while tasks:
    priority, _, name = heapq.heappop(tasks)
    print(priority, name)

sales = {"ana": 120, "ben": 340, "cy": 90, "dee": 410}
print(heapq.nlargest(2, sales, key=sales.get))
print(heapq.nsmallest(1, sales.items(), key=lambda pair: pair[1]))
