import cProfile
import pstats
import timeit


def duplicates_slow(items):
    return sorted({x for x in items if items.count(x) > 1})


data = [i % 1_000 for i in range(4_000)] + list(range(1_000, 3_000))


def duplicates_fast(items):
    seen = set()
    repeated = set()
    for x in items:
        if x in seen:
            repeated.add(x)
        seen.add(x)
    return sorted(repeated)


with cProfile.Profile() as profiler:
    answer = duplicates_slow(data)

stats = pstats.Stats(profiler)
calls = {key[2]: value[1] for key, value in stats.stats.items()}
count = "<method 'count' of 'list' objects>"
print("duplicates found:", len(answer))
print("list.count calls:", calls[count])

assert duplicates_fast(data) == answer
slow = min(timeit.repeat(lambda: duplicates_slow(data), number=1, repeat=3))
fast = min(timeit.repeat(lambda: duplicates_fast(data), number=1, repeat=3))
print("same answer:", duplicates_fast(data) == answer)
print("at least 20 times faster:", slow > 20 * fast)
