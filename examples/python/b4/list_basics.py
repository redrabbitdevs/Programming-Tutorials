tasks = ["write", "test"]

tasks.append("ship")
tasks.extend(["celebrate", "rest"])
tasks.insert(0, "plan")
print(tasks)

last = tasks.pop()
first = tasks.pop(0)
print(last, first, tasks)

tasks.remove("test")
print(tasks, len(tasks))

print("ship" in tasks, "nap" in tasks)
print(tasks.index("ship"))
print(tasks[0], tasks[-1])

tasks[0] = "draft"
print(tasks)

nested = [1, 2] + [3]
print(nested, nested * 2)
