counter = 0


def broken():
    counter = counter + 1
    return counter


try:
    broken()
except UnboundLocalError as error:
    print("UnboundLocalError:", error)


def with_global():
    global counter
    counter = counter + 1


with_global()
with_global()
print(counter)


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
