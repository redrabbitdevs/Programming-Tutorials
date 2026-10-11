text = "forty-two"
try:
    number = int(text)
    print("Converted:", number)
except ValueError:
    print("That is not a whole number:", text)
print("The program carries on")
