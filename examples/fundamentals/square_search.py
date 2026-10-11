guess = 1
while True:
    if guess * guess > 50:
        break
    guess += 1
print("first number whose square exceeds 50:", guess)
