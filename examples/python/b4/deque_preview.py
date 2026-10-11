from collections import deque

line = deque(["Ada", "Ben"])
line.append("Cy")
line.appendleft("VIP")
print(line)
print(line.popleft())
print(line.pop())
print(list(line), len(line))

recent = deque(maxlen=3)
for n in range(1, 6):
    recent.append(n)
print(recent)
