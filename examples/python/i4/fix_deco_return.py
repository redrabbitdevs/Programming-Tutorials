from functools import wraps


def log_calls(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print("calling", function.__name__)
        return function(*args, **kwargs)

    return wrapper


@log_calls
def double(n):
    return n * 2


print(double(4))
