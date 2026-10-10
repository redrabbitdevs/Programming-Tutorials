def make_counter():
    count = 0

    def next_value():
        nonlocal count
        count += 1
        return count

    return next_value


a = make_counter()
b = make_counter()
print(a(), a(), a())  # 1 2 3
print(b())            # 1: each counter has its own count
