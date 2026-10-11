import os

with open("squares.txt", "w", encoding="utf-8") as file:
    for n in range(1, 6):
        file.write(f"{n * n}\n")

total = 0
with open("squares.txt", encoding="utf-8") as file:
    for line in file:
        total += int(line)

print("Total:", total)
os.remove("squares.txt")
