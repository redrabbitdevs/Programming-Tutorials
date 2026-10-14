import dis


def total(prices):
    result = 0
    for p in prices:
        result += p
    return result


for _ in range(1000):
    total([1, 2, 3])

dis.dis(total, adaptive=True)
