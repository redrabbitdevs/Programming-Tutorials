todos = []


def add(item):
    todos.append(item)


def done(item):
    if item in todos:
        todos.remove(item)
        return True
    return False


def show():
    if not todos:
        print("Nothing to do.")
        return
    for number, item in enumerate(todos, start=1):
        print(f"{number}. {item}")


add("buy milk")
add("call Ada")
add("water plants")
show()
print(done("call Ada"))
print(done("fly to the moon"))
show()
todos.sort()
show()
todos.clear()
show()
