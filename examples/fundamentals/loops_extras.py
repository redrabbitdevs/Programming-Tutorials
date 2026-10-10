# range(start, stop) stops BEFORE stop: the classic off-by-one trap.
print(list(range(1, 5)))   # 1 to 4, not 1 to 5
print(list(range(1, 6)))   # 1 to 5

# continue skips to the next pass; break leaves the loop entirely.
for n in range(1, 10):
    if n % 2 == 0:
        continue
    if n > 7:
        break
    print("odd and at most 7:", n)

# A conditional loop whose number of passes is not known in advance.
number = 100
steps = 0
while number > 1:
    number = number // 2
    steps += 1
print("halvings until 1:", steps)

# while True with break: loop until a condition inside the body says stop.
guess = 1
while True:
    if guess * guess > 50:
        break
    guess += 1
print("first number whose square exceeds 50:", guess)
