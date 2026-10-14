import dis


def with_while(n):
    i = 0
    while i < n:
        i += 1
    return i


def with_for(n):
    for i in range(n):
        pass


def with_comprehension(n):
    return [i * i for i in range(n)]


for func in (with_while, with_for, with_comprehension):
    names = {ins.opname for ins in dis.get_instructions(func)}
    print(func.__name__)
    for op in ("FOR_ITER", "JUMP_BACKWARD", "MAKE_FUNCTION"):
        print("   ", op, op in names)
