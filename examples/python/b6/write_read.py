import os

with open("shopping.txt", "w", encoding="utf-8") as file:
    file.write("milk\n")
    file.write("café crème\n")
    print("bread", file=file)

with open("shopping.txt", "a", encoding="utf-8") as file:
    file.write("eggs\n")

with open("shopping.txt", encoding="utf-8") as file:
    items = file.read().splitlines()

print(items)
print(len("café crème"), "characters,", len("café crème".encode("utf-8")), "bytes")
os.remove("shopping.txt")
