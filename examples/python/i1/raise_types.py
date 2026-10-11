def double(n):
    if not isinstance(n, int):
        raise TypeError(f"expected an int, got {type(n).__name__}")
    return n * 2


for value in [4, "4", 4.5]:
    try:
        print(double(value))
    except TypeError as error:
        print("TypeError:", error)
