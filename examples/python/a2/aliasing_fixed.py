import copy


def make_grid(n):
    return [[0] * n for _ in range(n)]


def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags


grid = make_grid(2)
grid[0][0] = 1
print(grid)
print(add_tag("a"), add_tag("b"))

defaults = {"theme": "dark", "plugins": ["git"]}
user = copy.deepcopy(defaults)
user["plugins"].append("lint")
print(defaults)

backup = copy.deepcopy(grid)
grid[1][1] = 5
print(backup)

history = [[] for _ in range(3)]
history[0].append("x")
print(history)
