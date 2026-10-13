import functools
from concurrent.futures import InterpreterPoolExecutor


def label(value, unit):
    return f"{value} {unit}"


if __name__ == "__main__":
    in_km = functools.partial(label, unit="km")  # the setting travels along
    with InterpreterPoolExecutor(max_workers=2) as pool:
        print(list(pool.map(in_km, [5, 12])))
