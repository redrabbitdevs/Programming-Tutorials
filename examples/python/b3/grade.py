def letter(score):
    if score < 0 or score > 100:
        return "invalid"
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"


for score in [95, 90, 89.5, 70, 59, 101]:
    print(score, letter(score))

age = 17
status = "adult" if age >= 18 else "minor"
print(status)
