def outer():
    print("outer starts")
    middle()
    print("outer ends")


def middle():
    print("  middle starts")
    inner()
    print("  middle ends")


def inner():
    print("    inner runs")


outer()
