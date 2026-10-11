from functools import partial


def power(base, exponent):
    return base**exponent


square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(square(5), cube(2))

to_binary = partial(int, base=2)
print(to_binary("1011"))
print(list(map(to_binary, ["1", "10", "11"])))
print(square.func.__name__, square.keywords)
