from concurrent.futures import ProcessPoolExecutor


def main():
    rate = 0.2

    def add_tax(price):
        return round(price * (1 + rate), 2)

    with ProcessPoolExecutor(max_workers=2) as pool:
        try:
            print(list(pool.map(add_tax, [10, 25])))
        except Exception as error:
            print(type(error).__name__)


if __name__ == "__main__":
    main()
