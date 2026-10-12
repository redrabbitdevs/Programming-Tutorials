import inspect


def greet(name):
    """Return a greeting."""
    return f"Hello, {name}!"


print(inspect.getsource(greet), end="")
print(inspect.getdoc(greet))
print(inspect.isfunction(greet), inspect.ismethod(greet))
