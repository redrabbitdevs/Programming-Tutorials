def area(width: float, height: float) -> float:
    return width * height


def greet(name: str, times: int = 1) -> str:
    return ", ".join(["Hello " + name] * times)


print(area(3, 4.5))
print(greet("Ada", 2))
