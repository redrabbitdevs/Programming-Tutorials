def deep_count(items):
    count = 0
    for item in items:
        if isinstance(item, list):
            count += deep_count(item)
        else:
            count += 1
    return count


def flatten(items):
    flat = []
    for item in items:
        if isinstance(item, list):
            flat.extend(flatten(item))
        else:
            flat.append(item)
    return flat


data = [1, [2, 3], [4, [5, [6]]], []]
print(deep_count(data))
print(flatten(data))
