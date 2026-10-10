TARGET_YEAR = 2030

name = input("What is your name? ")
birth_year = int(input("Which year were you born? "))

age = TARGET_YEAR - birth_year
print(f"Hello, {name}!")
print(f"In {TARGET_YEAR} you will be {age}.")
