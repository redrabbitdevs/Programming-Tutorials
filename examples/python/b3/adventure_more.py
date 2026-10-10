def handle(command):
    match command.split():
        case ["inventory"]:
            return "You carry nothing."
        case ["drop", item]:
            return f"You drop the {item}."
        case _:
            return f"I don't understand {command!r}."


for line in ["drop lamp", "inventory", "drop"]:
    print(handle(line))
