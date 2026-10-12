values = [42, "text", (1, 2), frozenset({3}), (1, [2]), [1, 2], {"a": 1}]
for value in values:
    try:
        hash(value)
        print(f"{value!r}: hashable")
    except TypeError as error:
        print(f"{value!r}: {error}")
