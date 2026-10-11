from collections import deque

jobs = deque([("Ana", 3), ("Ben", 1), ("Cy", 2)])

tick = 0
while jobs:
    owner, pages = jobs.popleft()
    tick += pages
    print(f"{owner}'s job finished at tick {tick}")
