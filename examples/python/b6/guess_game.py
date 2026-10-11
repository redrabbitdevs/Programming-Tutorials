import random

random.seed(3)  # remove this line to get a different number every game
secret = random.randint(1, 20)
attempts = 0

print("I am thinking of a number from 1 to 20.")
while True:
    answer = input("Your guess: ")
    try:
        guess = int(answer)
    except ValueError:
        print("Please type a whole number.")
        continue

    attempts += 1
    if guess < secret:
        print("Too low.")
    elif guess > secret:
        print("Too high.")
    else:
        print(f"Correct! You needed {attempts} guesses.")
        break
