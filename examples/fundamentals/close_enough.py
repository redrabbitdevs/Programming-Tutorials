def close_enough(a, b):
    return abs(a - b) < 1e-9


print(close_enough(0.1 + 0.2, 0.3))
print(close_enough(0.1 + 0.2, 0.31))
