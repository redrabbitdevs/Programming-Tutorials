secret = 42
attempts = 0

while True:
    text = input("Guess a number from 1 to 100 (q to quit): ")
    if text == "q":
        print("Bye.")
        break
    if not text.isdigit():
        print("Please type a whole number.")
        continue
    attempts += 1
    guess = int(text)
    if guess < secret:
        print("Too low.")
    elif guess > secret:
        print("Too high.")
    else:
        print(f"Correct, after {attempts} attempts.")
        break
