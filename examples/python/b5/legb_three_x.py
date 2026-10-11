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
