def shout(function):
    def wrapper(*args, **kwargs):
        result = function(*args, **kwargs)
        return result.upper()

    return wrapper


def greet(name):
    return f"hello, {name}"


greet = shout(greet)
print(greet("ada"))


@shout
def farewell(name):
    return f"goodbye, {name}"


print(farewell("grace"))
print(farewell.__name__)
