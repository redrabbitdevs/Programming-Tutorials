def area(shape: Shape) -> float:
    return 0.0


print("defined")
print(area(None))
try:
    print(area.__annotations__)
except NameError as error:
    print("NameError:", error)


class Shape:
    pass


print(area.__annotations__)
