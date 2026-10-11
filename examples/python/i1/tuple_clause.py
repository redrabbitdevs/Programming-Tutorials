try:
    number = int(None)
except (ValueError, TypeError):
    number = 0
print(number)
