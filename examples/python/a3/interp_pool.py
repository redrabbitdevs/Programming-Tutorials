from concurrent.futures import InterpreterPoolExecutor


def collatz_steps(n):
    steps = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        steps += 1
    return steps


def check(n):
    if n <= 0:
        raise ValueError(f"not a positive number: {n}")
    return collatz_steps(n)


if __name__ == "__main__":
    with InterpreterPoolExecutor(max_workers=4) as pool:
        print(list(pool.map(check, [6, 7, 27, 97])))
        try:
            pool.submit(check, -5).result()
        except ValueError as error:
            print("ValueError:", error)
            print("cause:", type(error.__cause__).__name__)
