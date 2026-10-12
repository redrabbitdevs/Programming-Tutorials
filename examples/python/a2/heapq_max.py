import heapq

scores = [40, 95, 70, 88]
heapq.heapify_max(scores)
print(scores[0])
print(heapq.heappop_max(scores), heapq.heappop_max(scores))
