def to_fahrenheit(celsius):
    return celsius * 9 / 5 + 32


def to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5 / 9


if __name__ == "__main__":
    print("__name__ is", __name__)
    print(to_fahrenheit(100))
    print(to_celsius(212))
