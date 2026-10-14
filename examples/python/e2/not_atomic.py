import dis

count = 0


def bump():
    global count
    count += 1


steps = [
    ins.opname
    for ins in dis.get_instructions(bump)
    if ins.opname in ("LOAD_GLOBAL", "BINARY_OP", "STORE_GLOBAL")
]
print(" -> ".join(steps))
