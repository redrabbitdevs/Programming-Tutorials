from functools import wraps


def tag(label):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            return f"<{label}>{function(*args, **kwargs)}</{label}>"

        return wrapper

    return decorator


@tag("b")
@tag("i")
def text():
    return "hi"


print(text())
