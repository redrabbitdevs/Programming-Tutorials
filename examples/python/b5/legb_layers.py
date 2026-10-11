y = "global y"


def outer2():
    z = "enclosing z"

    def inner2():
        w = "local w"
        print(w, "|", z, "|", y, "|", len("abc"))

    inner2()


outer2()
