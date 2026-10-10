number = 4821
total = 0
while number > 0:
    total += number % 10   # the last digit
    number = number // 10  # drop the last digit
print(total)
