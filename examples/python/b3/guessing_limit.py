secret = 42
max_attempts = 7
attempts = 0
won = False

while attempts < max_attempts:
    text = input("Guess: ")
    if not text.isdigit():
        print("Please type a whole number.")
        continue
    attempts += 1
    guess = int(text)
    if guess == secret:
        print(f"Correct, after {attempts} attempts.")
        won = True
        break
    print("Too low." if guess < secret else "Too high.")

if not won:
    print(f"Out of guesses. The number was {secret}.")
