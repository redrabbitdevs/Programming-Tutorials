import timeit
from math import isqrt

from jobrun.builtin import count_primes


def trial_division(below: int) -> int:
    """The step 0 version, kept here as the reference answer."""
    count = 0
    for n in range(2, below):
        for d in range(2, isqrt(n) + 1):
            if n % d == 0:
                break
        else:
            count += 1
    return count


same = all(count_primes(b) == trial_division(b) for b in range(2, 3000))
print("same answers for 2..2999:", same)
print("primes below 1,000,000:", count_primes(1_000_000))

old = min(timeit.repeat(lambda: trial_division(100_000), number=1, repeat=5))
new = min(timeit.repeat(lambda: count_primes(100_000), number=1, repeat=5))
print("at least 20x faster:", old / new >= 20)
