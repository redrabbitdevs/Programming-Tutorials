import sys

numbers = list(range(1_000))
print("list object:", sys.getsizeof(numbers))
print("one small int:", sys.getsizeof(5))


def deep_size(obj, seen=None):
    """Size of obj plus everything it contains, each object once."""
    seen = set() if seen is None else seen
    if id(obj) in seen:
        return 0
    seen.add(id(obj))
    size = sys.getsizeof(obj)
    if isinstance(obj, (list, tuple, set, frozenset)):
        size += sum(deep_size(item, seen) for item in obj)
    elif isinstance(obj, dict):
        size += sum(deep_size(k, seen) + deep_size(v, seen)
                    for k, v in obj.items())
    return size


print("list and its ints:", deep_size(numbers))
print("same int 1000 times:", deep_size([5] * 1_000))
