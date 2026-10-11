def pair_up(keys, values):
    pairs = []
    for key, value in zip(keys, values, strict=True):
        pairs.append(f"{key}={value}")
    return pairs


print(pair_up(["x", "y", "z"], [1, 2, 3]))
try:
    print(pair_up(["x", "y", "z"], [1, 2]))
except ValueError as error:
    print("lists differ in length:", error)
