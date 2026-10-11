try:
    {}["x"]
except KeyError:
    print("specific handler")
except LookupError:
    print("general handler")
