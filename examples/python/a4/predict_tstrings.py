a, b = "x", "y"
pair = t"{a}{b}"
print(pair.strings)
print(len(list(pair)))
print(t"plain".values)
part = t"{a!r:>5}".interpolations[0]
print(part.conversion, repr(part.format_spec))
