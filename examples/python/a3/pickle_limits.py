import pickle
from concurrent.futures import ProcessPoolExecutor


def double(x):
    return x * 2


if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=2) as pool:
        print(list(pool.map(double, [1, 2, 3])))
        try:
            print(list(pool.map(lambda x: x * 2, [1, 2, 3])))
        except pickle.PicklingError:
            print("PicklingError: a lambda cannot be sent to a worker")
