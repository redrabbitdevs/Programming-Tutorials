TARGET_YEAR = 2030

name = input("What is your name? ")
birth_year = int(input("Which year were you born? "))

age = TARGET_YEAR - birth_year
print("Hello,", name)
print("In", TARGET_YEAR, "you will be", age)
