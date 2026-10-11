def shout(text):
    return text.upper() + "!"


def apply_twice(func, value):
    return func(func(value))


print(apply_twice(shout, "hi"))
print(apply_twice(lambda n: n * 2, 5))
