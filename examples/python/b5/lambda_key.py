words = ["banana", "kiwi", "Apple", "cherry"]

print(sorted(words))
print(sorted(words, key=len))
print(sorted(words, key=str.lower))
print(sorted(words, key=lambda w: w[-1]))
print(max(words, key=len))
print(min(words, key=lambda w: w.lower()))

add = lambda a, b: a + b
print(add(2, 3))
print(add.__name__)


def add_def(a, b):
    return a + b


print(add_def.__name__)
