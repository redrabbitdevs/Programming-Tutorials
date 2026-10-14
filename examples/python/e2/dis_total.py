import dis


def total(prices):
    result = 0
    for p in prices:
        result += p
    return result


dis.dis(total)
