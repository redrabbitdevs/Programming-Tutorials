def handle(command):
    match command.split():
        case ["quit"]:
            return "Goodbye."
        case ["look"]:
            return "You see a dusty room."
        case ["go", ("north" | "south" | "east" | "west") as direction]:
            return f"You walk {direction}."
        case ["go", _]:
            return "You cannot go that way."
        case ["take", item]:
            return f"You pick up the {item}."
        case ["take", *items] if items:
            return f"One thing at a time: {', '.join(items)}."
        case []:
            return "Say something."
        case _:
            return f"I don't understand {command!r}."


for line in ["look", "go north", "go up", "take lamp", "take a b", "", "dance", "quit"]:
    print(f"> {line}")
    print(handle(line))
