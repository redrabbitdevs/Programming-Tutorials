TARGET_YEAR = 2030

name = input("What is your name? ")
birth_year = int(input("Which year were you born? "))

print(f"Hello, {name}!", TARGET_YEAR - birth_year, sep=" - ")
