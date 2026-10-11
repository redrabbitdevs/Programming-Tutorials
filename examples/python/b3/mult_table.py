size = 4

print("   ", end="")
for col in range(1, size + 1):
    print(f"{col:4}", end="")
print()

for row in range(1, size + 1):
    print(f"{row:2} ", end="")
    for col in range(1, size + 1):
        print(f"{row * col:4}", end="")
    print()
