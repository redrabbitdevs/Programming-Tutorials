from collections import deque

queue = deque()

# Documents arrive in this order.
for doc in ["report.pdf", "photo.png", "notes.txt"]:
    queue.append(doc)                # enqueue at the back
    print("queued:", doc)

print("waiting:", list(queue))

while queue:
    doc = queue.popleft()            # dequeue from the front
    print("printing:", doc)

# The same deque also works as a stack, because it is open at both ends.
undo = deque()
undo.append("type a")
undo.append("type b")
print("undo:", undo.pop())           # most recent first
print("undo:", undo.pop())
