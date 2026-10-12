from concurrent.futures import ProcessPoolExecutor

seen = []


def record(word):
    seen.append(word)  # appends to the worker's own copy
    return len(seen)


if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=1) as pool:
        counts = list(pool.map(record, ["a", "b", "c"]))
    print("worker saw:", counts)
    print("parent sees:", seen)
