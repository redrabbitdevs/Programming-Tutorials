import functools
from concurrent.futures import ProcessPoolExecutor


def add_tax(price, rate):
    return round(price * (1 + rate), 2)


def main():
    with_tax = functools.partial(add_tax, rate=0.2)
    with ProcessPoolExecutor(max_workers=2) as pool:
        print(list(pool.map(with_tax, [10, 25])))


if __name__ == "__main__":
    main()
