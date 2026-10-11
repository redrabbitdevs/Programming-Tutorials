def flatten(items):
    for item in items:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item


def header_then_rows(header, rows):
    yield header
    yield from rows


print(list(flatten([1, [2, [3, 4]], 5, [[6]]])))
print(list(header_then_rows("name", ["ada", "grace"])))
