try:
    open("whatever.bin", "rb", encoding="utf-8")
except ValueError as error:
    print(error)
