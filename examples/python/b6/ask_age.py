while True:
    answer = input("How old are you? ")
    try:
        age = int(answer)
    except ValueError:
        print("Please type digits only, such as 34.")
    else:
        if age < 0:
            print("Age cannot be negative.")
        else:
            break

print("You are", age)
