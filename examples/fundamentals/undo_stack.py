from collections import deque

undo = deque()
undo.append("type a")
undo.append("type b")
print("undo:", undo.pop())           # most recent first
print("undo:", undo.pop())
