calls = 0


def add(a, b):
    return a + b


def add_and_count(a, b):
    global calls   # lets the function change the outer variable; see the scope lesson
    calls += 1
    return a + b


print(add(2, 3), add(2, 3))
print(add_and_count(2, 3))
print(add_and_count(2, 3))
print("calls:", calls)
