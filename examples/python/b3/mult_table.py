size = 4
print("   " + "".join(f"{col:4}" for col in range(1, size + 1)))
for row in range(1, size + 1):
    cells = "".join(f"{row * col:4}" for col in range(1, size + 1))
    print(f"{row:2} {cells}")
