# A pure function: the result depends only on the arguments, nothing else changes.
def add(a, b):
    return a + b


# An impure function: it changes something outside itself.
log = []


def add_and_log(a, b):
    log.append(f"adding {a} and {b}")
    return a + b


print(add(2, 3), add(2, 3))
print(add_and_log(2, 3))
print(add_and_log(2, 3))
print(log)


# The call stack: each call waits for the one above it to finish.
def outer():
    print("outer starts")
    middle()
    print("outer ends")


def middle():
    print("  middle starts")
    inner()
    print("  middle ends")


def inner():
    print("    inner runs")


outer()


# A function with no return statement gives back None.
def shout(text):
    print(text.upper())


result = shout("hi")
print(result)
