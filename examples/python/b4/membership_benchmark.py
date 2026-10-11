from timeit import timeit

size = 100_000
as_list = list(range(size))
as_set = set(as_list)
missing = -1  # worst case for the list: scan everything

list_time = timeit(lambda: missing in as_list, number=200)
set_time = timeit(lambda: missing in as_set, number=200)

print(f"list is slower: {list_time > set_time}")
print(f"set is at least 100x faster: {list_time / set_time > 100}")
