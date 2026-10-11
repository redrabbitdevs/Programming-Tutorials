def countdown(n):
    print("starting")
    while n > 0:
        yield n
        n -= 1
    print("done")


gen = countdown(3)
print(type(gen).__name__)
print("created")
print(next(gen))
print(next(gen))
print(list(gen))
