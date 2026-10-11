group = ExceptionGroup("batch", [ValueError("a"), KeyError("b"), ValueError("c")])
matched, rest = group.split(ValueError)

print(matched)
print([str(e) for e in matched.exceptions])
print(rest)
