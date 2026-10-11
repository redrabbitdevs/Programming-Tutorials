import time

size = 100_000
as_list = list(range(size))
as_set = set(as_list)

start = time.perf_counter()
for _ in range(200):
    -1 in as_list
list_time = time.perf_counter() - start

start = time.perf_counter()
for _ in range(200):
    -1 in as_set
set_time = time.perf_counter() - start

print("list is slower:", list_time > set_time)
print("set is at least 100x faster:", list_time / set_time > 100)
