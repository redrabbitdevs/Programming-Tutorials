import dis


def total(prices):
    result = 0
    for p in prices:
        result += p
    return result


def line_at(code, offset):
    for start, end, line in code.co_lines():
        if start <= offset < end:
            return line
    return None


code = total.__code__
first = code.co_firstlineno
print([line - first for _start, _end, line in code.co_lines()])
for ins in dis.get_instructions(total):
    if ins.opname in ("FOR_ITER", "BINARY_OP"):
        line = line_at(code, ins.offset) - first
        print(f"{ins.opname} is on line +{line}")
