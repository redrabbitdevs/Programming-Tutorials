def c():
    print("c")


def b():
    c()
    print("b")


def a():
    b()
    print("a")


a()
