import heapq
from bisect import bisect_left, bisect_right

xs = [1, 3, 3, 3, 7]
print(bisect_left(xs, 3), bisect_right(xs, 3), bisect_left(xs, 4))

h = [5, 4, 3, 2, 1]
heapq.heapify(h)
print(h[0], h == sorted(h))
