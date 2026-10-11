grid = [[0] * 2] * 2          # two references to the SAME row
grid[0][0] = 1
print(grid)

grid = [[0] * 2 for _ in range(2)]   # a fresh row each time
grid[0][0] = 1
print(grid)
