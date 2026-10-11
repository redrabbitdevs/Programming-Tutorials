from collections import deque

line = deque(["Ada", "Ben"])
line.append("Cy")
line.appendleft("VIP")
print(line)
print(line.popleft())
print(line.pop())
print(list(line), len(line))
