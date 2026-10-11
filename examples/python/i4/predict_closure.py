def outer():
    x = "before"

    def show():
        return x

    x = "after"
    return show


print(outer()())
