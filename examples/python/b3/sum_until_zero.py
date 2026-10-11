total = 0

while True:
    number = int(input("Number (0 to stop): "))
    if number == 0:
        break
    total += number

print("Total:", total)
