from collections import deque

recent = deque(maxlen=3)
for n in range(1, 6):
    recent.append(n)
print(recent)
