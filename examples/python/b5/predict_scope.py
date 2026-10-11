level = "global"


def show():
    print(level)


def change():
    level = "local"
    show()


change()
print(level)
