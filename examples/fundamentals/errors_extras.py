# Syntax error: the program cannot even be read. compile() lets us catch one safely.
try:
    compile("print(", "<example>", "exec")
except SyntaxError:
    print("syntax error caught")

# Runtime error: valid code that fails while running.
try:
    print(10 / 0)
except ZeroDivisionError as err:
    print("runtime error caught:", err)


# Logic error: runs fine, answers wrongly. No exception will ever tell you.
def average(a, b):
    return a + b / 2   # bug: should be (a + b) / 2


print(average(10, 20), "but the average of 10 and 20 is 15")


# Fail fast: refuse bad input at the door with a clear message.
def set_age(age):
    if age < 0 or age > 150:
        raise ValueError(f"age must be between 0 and 150, got {age}")
    return age


try:
    set_age(-3)
except ValueError as err:
    print("rejected:", err)


# Error values instead of exceptions: return None when there is no answer.
def find_index(items, wanted):
    for i, item in enumerate(items):
        if item == wanted:
            return i
    return None


print(find_index(["a", "b", "c"], "b"))
print(find_index(["a", "b", "c"], "z"))
