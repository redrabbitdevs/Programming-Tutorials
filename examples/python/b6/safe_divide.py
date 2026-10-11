def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None


print(safe_divide(10, 4))
print(safe_divide(7, 0))
print(safe_divide(0, 5))
