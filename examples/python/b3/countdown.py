n = 3
while n > 0:
    print(n)
    n -= 1
print("Liftoff")

total = 0
count = 0
for text in ["10", "20", "", "99"]:
    if text == "":
        break
    total += int(text)
    count += 1
print(total, count)
