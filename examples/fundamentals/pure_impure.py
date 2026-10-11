running = 0


def add_impure(n):
    global running
    running += n
    return running


def add_pure(total, n):
    return total + n


first = add_impure(5)
second = add_impure(5)
print("impure:", first, second)

first = add_pure(0, 5)
second = add_pure(0, 5)
print("pure:", first, second)
