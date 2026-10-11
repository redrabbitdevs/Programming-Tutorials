from collections import deque

queue = deque()

# Documents arrive in this order.
for doc in ["report.pdf", "photo.png", "notes.txt"]:
    queue.append(doc)                # enqueue at the back
    print("queued:", doc)

print("waiting: [" + ", ".join(queue) + "]")

while queue:
    doc = queue.popleft()            # dequeue from the front
    print("printing:", doc)
