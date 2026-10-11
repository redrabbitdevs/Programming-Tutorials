import time


class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.elapsed = time.perf_counter() - self.start
        return False


with Timer() as t:
    time.sleep(0.05)
print(t.elapsed >= 0.04)
print(t.elapsed < 5)
