from functools import partial

adders = [lambda x: x + i for i in range(3)]
print([f(10) for f in adders])

# Fix 1: bind the current value as a default argument.
adders = [lambda x, i=i: x + i for i in range(3)]
print([f(10) for f in adders])


# Fix 2: a factory function gives each closure its own variable.
def make_adder(i):
    return lambda x: x + i


adders = [make_adder(i) for i in range(3)]
print([f(10) for f in adders])


# Fix 3: functools.partial stores the value right away.
def add(x, i):
    return x + i


adders = [partial(add, i=i) for i in range(3)]
print([f(10) for f in adders])
