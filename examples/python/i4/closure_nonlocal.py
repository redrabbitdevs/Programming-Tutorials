def make_counter_broken():
    count = 0

    def increment():
        count += 1
        return count

    return increment


def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment


broken = make_counter_broken()
try:
    broken()
except UnboundLocalError:
    print("UnboundLocalError")

counter = make_counter()
print(counter(), counter(), counter())
other = make_counter()
print(other())
