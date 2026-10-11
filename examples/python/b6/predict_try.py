def check(values):
    for value in values:
        try:
            result = 10 // value
        except ZeroDivisionError:
            print("zero")
        else:
            print("result", result)
        finally:
            print("checked", value)


check([5, 0])
