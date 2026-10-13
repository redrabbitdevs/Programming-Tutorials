from concurrent import interpreters


def grow(items):
    items.append("new")
    return len(items)


if __name__ == "__main__":
    interp = interpreters.create()
    stock = ["a", "b"]
    print(interp.call(grow, stock), interp.call(grow, stock), stock)
    interp.close()
