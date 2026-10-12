from collections import deque

queue = deque(["ada", "ben"])
queue.append("cy")
print(queue.popleft(), queue)

stack = deque()
for page in ["home", "docs", "faq"]:
    stack.append(page)
print(stack.pop(), stack.pop(), stack)

ring = deque([1, 2, 3, 4, 5])
ring.rotate(2)
print(ring)
ring.rotate(-1)
print(ring)

last_three = deque(range(10), maxlen=3)
print(last_three, last_three[0])
