with open("notes.txt", encoding="utf-8") as file:
    lines = [line.rstrip("\n") for line in file]

longest = max(lines, key=len)
print("Lines:", len(lines))
print("Longest:", longest)
print("Length:", len(longest))
