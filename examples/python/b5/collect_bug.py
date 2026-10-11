def collect(name, names=[]):
    names.append(name)
    return names


print(collect("Ada"))
print(collect("Grace"))
print(collect("Alan", ["Ada"]))
