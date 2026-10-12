from concurrent.futures import ThreadPoolExecutor


def inverse(x):
    return 1 / x


with ThreadPoolExecutor(max_workers=4) as pool:
    try:
        for result in pool.map(inverse, [4, 2, 0, 1]):
            print(result)
    except ZeroDivisionError as error:
        print("stopped:", error)
