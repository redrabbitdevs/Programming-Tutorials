for line in "look;go north;go up;dance;quit".split(";"):
    print(">", line)
    match line.split():
        case ["quit"]:
            print("Goodbye.")
        case ["look"]:
            print("You see a dusty room.")
        case ["go", ("north" | "south" | "east" | "west") as direction]:
            print("You walk", direction + ".")
        case ["go", _]:
            print("You cannot go that way.")
        case _:
            print("I don't understand", repr(line) + ".")
