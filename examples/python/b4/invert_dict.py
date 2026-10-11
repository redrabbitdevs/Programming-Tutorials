def invert(mapping):
    result = {}
    for key, value in mapping.items():
        result.setdefault(value, []).append(key)
    return result


colors = {"apple": "red", "cherry": "red", "banana": "yellow", "lime": "green"}
print(invert(colors))
