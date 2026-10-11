from collections import deque

maze = [
    "S.#.....",
    ".##.###.",
    "...#...E",
    ".#...#..",
]

rows, cols = len(maze), len(maze[0])
for r in range(rows):
    for c in range(cols):
        if maze[r][c] == "S":
            start = (r, c)

distance = {start: 0}
queue = deque([start])
answer = None
while queue:
    r, c = queue.popleft()
    if maze[r][c] == "E":
        answer = distance[(r, c)]
        break
    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] != "#" and (nr, nc) not in distance:
            distance[(nr, nc)] = distance[(r, c)] + 1
            queue.append((nr, nc))

print("moves:", answer)
