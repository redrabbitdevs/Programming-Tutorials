add = lambda a, b: a + b
print(add(2, 3))
print(add.__name__)


def add_def(a, b):
    return a + b


print(add_def.__name__)
