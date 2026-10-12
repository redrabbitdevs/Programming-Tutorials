import multiprocessing
from concurrent.futures import ProcessPoolExecutor


def cube(x):
    return x**3


if __name__ == "__main__":
    spawn = multiprocessing.get_context("spawn")
    with ProcessPoolExecutor(max_workers=2, mp_context=spawn) as pool:
        print(list(pool.map(cube, range(6))))
