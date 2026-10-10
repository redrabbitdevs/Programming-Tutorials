age = 15

if age < 0:
    ticket = "invalid age"
elif age < 5:
    ticket = "free"
elif age < 18:
    ticket = "child"
elif age < 65:
    ticket = "adult"
else:
    ticket = "senior"

print(f"Age {age}: {ticket}")
