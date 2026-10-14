import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor


def wait_for_reply(n):
    time.sleep(0.2)  # blocking I/O, such as a network call
    return n


if __name__ == "__main__":
    for executor_class in (ThreadPoolExecutor, ProcessPoolExecutor):
        start = time.perf_counter()
        with executor_class(max_workers=3) as pool:
            results = list(pool.map(wait_for_reply, range(6)))
        elapsed = time.perf_counter() - start
        print(f"{executor_class.__name__:20} {results}", 0.4 <= elapsed < 1.0)
