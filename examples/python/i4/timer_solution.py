import time
from functools import wraps


def timer(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return function(*args, **kwargs)
        finally:
            wrapper.last_elapsed = time.perf_counter() - start

    wrapper.last_elapsed = None
    return wrapper


@timer
def nap(seconds):
    """Sleep a little and return the length."""
    time.sleep(seconds)
    return seconds


print(nap.last_elapsed)
print(nap(0.05))
print(nap.last_elapsed >= 0.05)
print(nap.__name__, "-", nap.__doc__)
