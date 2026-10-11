todos = ["buy milk", "call Ada", "water plants"]

for number, item in enumerate(todos, start=1):
    print(f"{number}. {item}")

for name in ["call Ada", "fly to the moon"]:
    if name in todos:
        todos.remove(name)
        print("removed: True")
    else:
        print("removed: False")

for number, item in enumerate(todos, start=1):
    print(f"{number}. {item}")

todos.clear()
if not todos:
    print("Nothing to do.")
