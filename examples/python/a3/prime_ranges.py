from concurrent.futures import ProcessPoolExecutor


def count_primes(start, stop):
    """Sieve the numbers below stop, then count those from start on."""
    is_prime = [True] * stop
    is_prime[:2] = [False] * min(2, stop)
    for n in range(2, int(stop**0.5) + 1):
        if is_prime[n]:
            is_prime[n * n :: n] = [False] * len(range(n * n, stop, n))
    return sum(is_prime[start:])


if __name__ == "__main__":
    bounds = [(i * 50_000, (i + 1) * 50_000) for i in range(4)]
    with ProcessPoolExecutor(max_workers=4) as pool:
        counts = list(pool.map(count_primes, *zip(*bounds)))
    for (start, stop), count in zip(bounds, counts):
        print(f"[{start:>7}, {stop:>7}): {count}")
    print("total:", sum(counts))
