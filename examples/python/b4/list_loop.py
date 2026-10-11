tasks = ["write", "test", "ship"]
for number, task in enumerate(tasks, start=1):
    print(number, task)
for task in reversed(tasks):
    print(task, end=" ")
print()
