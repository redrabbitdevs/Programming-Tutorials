x = "global x"


def outer():
    x = "enclosing x"

    def inner():
        x = "local x"
        print("inner sees:", x)

    inner()
    print("outer sees:", x)


outer()
print("module sees:", x)

y = "global y"


def outer2():
    z = "enclosing z"

    def inner2():
        w = "local w"
        print(w, "|", z, "|", y, "|", len("abc"))

    inner2()


outer2()
