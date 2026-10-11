def total_with_tax(prices, rate):
    total = 0
    for price in prices:
        total += price
    return total * 1 + rate


print(total_with_tax([10, 20], 0.1))
