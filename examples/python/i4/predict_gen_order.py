def letters():
    print("a")
    yield "x"
    print("b")
    yield "y"
    print("c")


gen = letters()
print("start")
print(next(gen))
print("middle")
print(next(gen))
