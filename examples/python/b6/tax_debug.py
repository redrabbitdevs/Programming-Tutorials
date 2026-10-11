def total_with_tax(prices, rate):
    total = 0
    for price in prices:
        total += price
    print(f"{total=} {rate=}")
    result = total * 1 + rate
    print(f"{result=}")
    return result


print(total_with_tax([10, 20], 0.1))
