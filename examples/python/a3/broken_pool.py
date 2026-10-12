import os
from concurrent.futures import ProcessPoolExecutor
from concurrent.futures.process import BrokenProcessPool


def crash(code):
    os._exit(code)  # the worker dies without any cleanup


if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=1) as pool:
        future = pool.submit(crash, 3)
        try:
            future.result()
        except BrokenProcessPool as error:
            print(type(error).__name__)
            print("exit code 3" in str(error.__cause__))
