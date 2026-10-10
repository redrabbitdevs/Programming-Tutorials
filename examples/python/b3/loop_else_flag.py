words = ["tree", "river", "stone"]

found = False
for word in words:
    if word.startswith("r"):
        found = True
        break
print("flag version:", found)

for word in words:
    if word.startswith("z"):
        print("found z")
        break
else:
    print("else version: no word starts with z")

for i in range(1, 4):
    for j in range(1, 4):
        if j == 2:
            continue
        if i == 3:
            break
        print(i, j)
