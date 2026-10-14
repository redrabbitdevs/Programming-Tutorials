def total(prices):
    result = 0
    for p in prices:
        result += p
    return result


code = total.__code__
print(type(code).__name__, code.co_name, code.co_argcount)
print(code.co_varnames)
print(code.co_firstlineno)
print(total([3, 4, 5]))
