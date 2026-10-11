def f(d):
    # loop over d
    t = 0
    for x in d:
        if x[1] == "food":
            t = t + x[0] * 1.2
        elif x[1] == "book":
            t = t + x[0] * 1.0
        else:
            t = t + x[0] * 1.2
    return t


print(f([(10, "food"), (20, "book"), (5, "toy")]))
