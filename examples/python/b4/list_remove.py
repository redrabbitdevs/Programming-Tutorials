tasks = ["plan", "write", "test", "ship", "celebrate", "rest"]
last = tasks.pop()
first = tasks.pop(0)
print(last, first, tasks)

tasks.remove("test")
print(tasks, len(tasks))
print(tasks.index("ship"))
