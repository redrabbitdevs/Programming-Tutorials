def paint(color):
    if color == "red":
        return "stop"
    return "unknown colour"


print(paint("red"))
print(paint("Red"))  # same idea, different spelling
