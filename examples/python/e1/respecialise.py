import dis


def add(a, b):
    return a + b


def binary_ops(func):
    return [i.opname for i in dis.get_instructions(func, adaptive=True)
            if i.opname.startswith("BINARY_OP")]


for _ in range(1_000):
    add(2, 3)
for _ in range(1_000):
    add("py", "thon")
print(binary_ops(add))
