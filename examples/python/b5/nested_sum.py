def nested_sum(items):
    total = 0
    for item in items:
        if isinstance(item, list):
            total += nested_sum(item)
        else:
            total += item
    return total


print(nested_sum([1, [2, 3], [4, [5, [6]]], []]))
print(nested_sum([]))
print(nested_sum([[[[10]]]]))
