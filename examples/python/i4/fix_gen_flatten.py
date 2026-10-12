def pairs(rows):
    for a, b in rows:
        yield a
        yield b


def pairs_from(rows):
    for row in rows:
        yield from row


print(list(pairs([(1, 2), (3, 4)])))
print(list(pairs_from([(1, 2), (3, 4)])))
print(list(pairs_from([(1, 2, 3), (), (4,)])))
