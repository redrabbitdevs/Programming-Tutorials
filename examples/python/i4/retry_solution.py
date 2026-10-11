from functools import wraps


def retry(times):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return function(*args, **kwargs)
                except Exception as error:
                    print(f"attempt {attempt} failed: {error}")
                    if attempt == times:
                        raise

        return wrapper

    return decorator


calls = 0


@retry(3)
def flaky():
    global calls
    calls += 1
    if calls < 3:
        raise ConnectionError("no network")
    return "ok"


print(flaky())


@retry(2)
def always_fails():
    raise ValueError("nope")


try:
    always_fails()
except ValueError as error:
    print("gave up:", error)
