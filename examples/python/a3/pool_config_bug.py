from concurrent.futures import InterpreterPoolExecutor

UNIT = "m"


def label(value):
    return f"{value} {UNIT}"


if __name__ == "__main__":
    UNIT = "km"  # meant to apply to every worker
    with InterpreterPoolExecutor(max_workers=2) as pool:
        print(list(pool.map(label, [5, 12])))
