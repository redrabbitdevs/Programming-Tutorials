def convert(text):
    try:
        return int(text)
    except ValueError:
        return 1 / 0


try:
    convert("x")
except ZeroDivisionError as error:
    print("error:  ", error)
    print("cause:  ", error.__cause__)
    print("context:", repr(error.__context__))
