values = [0, 0.0, -1, "", "False", [], [[]], {}, {"a": 0}, None, " ", ()]
for value in values:
    print(repr(value), bool(value))
