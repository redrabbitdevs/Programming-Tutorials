from concurrent.futures import (
    InterpreterPoolExecutor,
    ProcessPoolExecutor,
    ThreadPoolExecutor,
)


def sum_of_squares(n):
    return sum(i * i for i in range(n))


if __name__ == "__main__":
    sizes = [10, 100, 1000]
    for executor_class in (
        ThreadPoolExecutor,
        ProcessPoolExecutor,
        InterpreterPoolExecutor,
    ):
        with executor_class(max_workers=3) as pool:
            results = list(pool.map(sum_of_squares, sizes))
        print(f"{executor_class.__name__:24} {results}")
