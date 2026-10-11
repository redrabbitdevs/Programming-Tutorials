def make_counter():
    count = 0

    def next_value():
        nonlocal count
        count += 1
        return count

    return next_value


first = make_counter()
second = make_counter()
print(first())
print(first())
print(second())
