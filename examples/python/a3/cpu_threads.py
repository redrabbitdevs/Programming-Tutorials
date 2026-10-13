import sys
from concurrent.futures import ThreadPoolExecutor


def count_primes(start, stop):
    found = 0
    for n in range(max(start, 2), stop):
        if all(n % d for d in range(2, int(n**0.5) + 1)):
            found += 1
    return found


workers = int(sys.argv[1]) if len(sys.argv) > 1 else 4
starts = [0, 50_000, 100_000, 150_000]
stops = [s + 50_000 for s in starts]

with ThreadPoolExecutor(max_workers=workers) as pool:
    total = sum(pool.map(count_primes, starts, stops))
print("primes below 200000:", total)
