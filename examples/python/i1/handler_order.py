try:
    {}["x"]
except LookupError:
    print("general handler")
except KeyError:
    print("specific handler")
