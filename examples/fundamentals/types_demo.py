literals = [42, 3.14, "42", True, None, [1, 2], 2**100]
for value in literals:
    print(f"{value!r:>34}  {type(value).__name__}")

for label, make in [
    ('"5" + 3', lambda: "5" + 3),
    ('"5" * 3', lambda: "5" * 3),
    ("5 + 3.0", lambda: 5 + 3.0),
    ("True + 1", lambda: True + 1),
]:
    try:
        print(label, "->", repr(make()))
    except TypeError as error:
        print(label, "-> TypeError:", error)
