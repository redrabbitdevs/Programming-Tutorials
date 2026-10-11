class Stone:
    pass


def announce(thing):
    print(thing.speak())


try:
    announce(Stone())
except AttributeError as error:
    print("AttributeError:", error)
