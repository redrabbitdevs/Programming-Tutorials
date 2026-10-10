x = "global"


def show():
    x = "local"  # a new variable that shadows the outer x
    print("inside:", x)


show()
print("outside:", x)
