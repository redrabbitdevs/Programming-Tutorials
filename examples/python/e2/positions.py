import dis


def ratio(a, b):
    return a / b


first = ratio.__code__.co_firstlineno
for ins in dis.get_instructions(ratio):
    if ins.opname == "BINARY_OP":
        pos = ins.positions
        print(f"line +{pos.lineno - first}")
        print("columns", pos.col_offset, "to", pos.end_col_offset)

try:
    ratio(1, 0)
except ZeroDivisionError as exc:
    print(type(exc).__name__)
