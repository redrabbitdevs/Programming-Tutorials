total = 10


def puzzle1():
    global total
    total += 5
    return total


def puzzle2(flag):
    result = "no"
    if flag:
        result = "yes"
    return result


def puzzle3():
    label = "ready"
    print(label)


def puzzle4():
    count = 0

    def bump():
        nonlocal count
        count += 1

    bump()
    return count


def puzzle5(words):
    last = ""
    for word in words:
        last = word
    return last


print(puzzle1())
print(puzzle2(False), puzzle2(True))
puzzle3()
print(puzzle4())
print(puzzle5([]))
