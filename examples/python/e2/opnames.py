import dis


def total(prices):
    result = 0
    for p in prices:
        result += p
    return result


names = {ins.opname for ins in dis.get_instructions(total)}
for op in ["FOR_ITER", "JUMP_BACKWARD", "BINARY_OP", "RETURN_VALUE"]:
    print(f"{op:<14}{op in names}")
