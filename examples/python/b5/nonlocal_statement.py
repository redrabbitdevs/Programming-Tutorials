def make_counter():
    count = 0

    def step():
        nonlocal count
        count += 1
        return count

    return step


first = make_counter()
print(first(), first(), first())
second = make_counter()
print(second())
