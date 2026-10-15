"""count_primes as the advanced project left it, alone in one script."""
from math import isqrt


def count_primes(below: int) -> int:
    count = 0
    for n in range(2, below):
        for d in range(2, isqrt(n) + 1):
            if n % d == 0:
                break
        else:
            count += 1
    return count


print(count_primes(1_000_000))
