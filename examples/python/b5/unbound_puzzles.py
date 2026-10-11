total = 10


def puzzle1():
    total += 5
    return total


def puzzle2(flag):
    if flag:
        result = "yes"
    return result


def puzzle3():
    print(label)
    label = "ready"


def puzzle4():
    count = 0

    def bump():
        count += 1

    bump()
    return count


def puzzle5():
    try:
        int("x")
    except ValueError as error:
        pass
    return error


def attempt(name, func, *args):
    try:
        func(*args)
    except UnboundLocalError as error:
        print(name, "->", error)


attempt("puzzle1", puzzle1)
attempt("puzzle2", puzzle2, False)
attempt("puzzle3", puzzle3)
attempt("puzzle4", puzzle4)
attempt("puzzle5", puzzle5)
