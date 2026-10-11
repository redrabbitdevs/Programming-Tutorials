OPERATIONS = {
    "add": lambda a, b: a + b,
    "sub": lambda a, b: a - b,
    "mul": lambda a, b: a * b,
}


def calculate(op, a, b):
    func = OPERATIONS.get(op)
    if func is None:
        return None
    return func(a, b)


print(calculate("add", 2, 3))
print(calculate("mul", 4, 5))
print(calculate("pow", 2, 3))
