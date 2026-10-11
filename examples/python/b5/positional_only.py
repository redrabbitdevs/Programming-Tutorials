def clamp(value, low, high, /):
    return max(low, min(value, high))


print(clamp(15, 0, 10))
print(clamp(-3, 0, 10))
