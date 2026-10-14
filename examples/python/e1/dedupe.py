import timeit

TAGS = [f"tag{i % 3_000}" for i in range(12_000)]


def dedupe_slow(items):
    out = []
    for item in items:
        if item not in out:          # scans out every time
            out.append(item)
    return out


def dedupe_fast(items):
    return list(dict.fromkeys(items))  # dicts keep insertion order


slow = min(timeit.repeat(lambda: dedupe_slow(TAGS), number=1, repeat=3))
fast = min(timeit.repeat(lambda: dedupe_fast(TAGS), number=1, repeat=3))
print("same order:", dedupe_fast(TAGS) == dedupe_slow(TAGS))
print("at least 20x faster:", slow > 20 * fast)
