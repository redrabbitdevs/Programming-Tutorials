def greet(name):
    """Return a greeting for name."""
    return "Hello, " + name + "!"


def show(name):
    print("Hello, " + name + "!")


message = greet("Ada")
print(message)
print(len(message))

result = show("Grace")
print(result)
print(result is None)

print(greet.__doc__)
print(greet.__name__)
