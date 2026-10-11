try:
    print(10 / 0)
except ZeroDivisionError as err:
    print("runtime error caught:", err)
