counter = 0


def with_global():
    global counter
    counter = counter + 1


with_global()
with_global()
print(counter)
