import dis


def classify(n):
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"


code = classify.__code__
first = code.co_firstlineno
found = [
    ins.positions.lineno - first
    for ins in dis.get_instructions(classify)
    if ins.opname.startswith("RETURN")
]
print(found)
