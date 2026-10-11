temperature = 28

if temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
else:
    print("Cool")

basket = []
if basket:
    print("Items:", basket)
else:
    print("The basket is empty")

# Guard clauses: handle the bad cases first and return early.
def describe_age(age):
    if age < 0:
        return "invalid"
    if age < 13:
        return "child"
    if age < 20:
        return "teenager"
    return "adult"


for age in [-1, 8, 15, 40]:
    print(age, describe_age(age))

# The conditional expression picks one of two values.
count = 1
print(f"{count} item" if count == 1 else f"{count} items")
