from functools import wraps


def log_calls(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(f"calling {function.__name__}{args}")
        result = function(*args, **kwargs)
        print(f"{function.__name__} returned {result!r}")
        return result

    return wrapper


@log_calls
def add(a, b):
    """Add two numbers."""
    return a + b


print(add(2, 3))
print(add.__name__)
print(add.__doc__)
print(add.__wrapped__(10, 20))
