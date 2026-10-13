from concurrent.futures import ProcessPoolExecutor


def steps(n):
    count = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        count += 1
    return count


def longest_chain(start, stop):
    best = max(range(start, stop), key=steps)
    return best, steps(best)


if __name__ == "__main__":
    starts = [1, 25_001, 50_001, 75_001]
    stops = [s + 25_000 for s in starts]
    with ProcessPoolExecutor() as pool:
        for best, length in pool.map(longest_chain, starts, stops):
            print(f"{best:6} needs {length} steps")
