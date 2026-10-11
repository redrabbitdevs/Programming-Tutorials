for line in "take lamp;take a b;".split(";"):
    print(">", line)
    match line.split():
        case ["take", item]:
            print("You pick up the", item + ".")
        case ["take", *items] if items:
            print("One thing at a time:", ", ".join(items) + ".")
        case []:
            print("Say something.")
        case _:
            print("I don't understand.")
