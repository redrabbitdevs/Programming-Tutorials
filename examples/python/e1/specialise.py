import dis


def add(a, b):
    return a + b


def binary_ops(func):
    return [i.opname for i in dis.get_instructions(func, adaptive=True)
            if i.opname.startswith("BINARY_OP")]


print("cold:      ", binary_ops(add))
for _ in range(1_000):
    add(2, 3)                       # warm up with ints
print("after ints:", binary_ops(add))
