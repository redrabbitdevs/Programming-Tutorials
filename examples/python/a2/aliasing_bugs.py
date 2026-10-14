def make_grid(n):
    row = [0] * n
    return [row] * n


def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags


grid = make_grid(2)
grid[0][0] = 1
print(grid)
print(add_tag("a"), add_tag("b"))
defaults = {"theme": "dark", "plugins": ["git"]}
user = defaults.copy()
user["plugins"].append("lint")
print(defaults)
backup = grid
grid[1][1] = 5
print(backup)
history = [[]] * 3
history[0].append("x")
print(history)
