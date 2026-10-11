total = 0
count = 0

while True:
    text = input("Number (blank to stop): ")
    if text == "":
        break
    total += int(text)
    count += 1

print("Total:", total, "from", count, "numbers")
