def collect(name, names=None):
    if names is None:
        names = []
    names.append(name)
    return names


print(collect("Ada"))
print(collect("Grace"))
print(collect("Alan", ["Ada"]))
