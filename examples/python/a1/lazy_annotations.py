def scale(value: Number, factor: Number) -> Number:
    return value * factor


print(scale(2, 3))
print(callable(scale.__annotate__))
try:
    scale.__annotations__
except NameError as error:
    print("NameError:", error)

type Number = int | float
print(scale.__annotations__)
