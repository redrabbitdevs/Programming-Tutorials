for line in "drop lamp;inventory;drop".split(";"):
    match line.split():
        case ["inventory"]:
            print("You carry nothing.")
        case ["drop", item]:
            print("You drop the", item + ".")
        case _:
            print("I don't understand", repr(line) + ".")
