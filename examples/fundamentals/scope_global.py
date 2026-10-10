counter = 0


def increment():
    global counter  # without this line, "counter += 1" raises UnboundLocalError
    counter += 1


increment()
increment()
print(counter)
