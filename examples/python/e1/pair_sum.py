import random
import sys
import timeit

random.seed(3)
NUMBERS = random.sample(range(1_000_000), 3_000)


def has_pair_naive(numbers, target):
    for i, a in enumerate(numbers):
        for b in numbers[i + 1:]:
            if a + b == target:
                return True
    return False


def has_pair_set(numbers, target):
    seen = set()
    for a in numbers:
        if target - a in seen:
            return True
        seen.add(a)
    return False


target = -1                                 # never found: worst case
slow = min(timeit.repeat(lambda: has_pair_naive(NUMBERS, target),
                         number=1, repeat=3))
fast = min(timeit.repeat(lambda: has_pair_set(NUMBERS, target),
                         number=1, repeat=3))
print("same answer:", has_pair_naive(NUMBERS, 5) == has_pair_set(NUMBERS, 5))
print("set version 50x faster:", slow > 50 * fast)
print(f"measured: {slow / fast:.0f}x faster", file=sys.stderr)
