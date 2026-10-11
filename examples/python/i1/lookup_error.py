def fetch(container, key):
    try:
        return container[key]
    except LookupError as error:
        return f"missing ({type(error).__name__})"


print(fetch({"a": 1}, "b"))
print(fetch([10, 20], 5))
print(fetch({"a": 1}, "a"))
