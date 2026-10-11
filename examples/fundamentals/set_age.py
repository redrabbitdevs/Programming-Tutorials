def set_age(age):
    if age < 0 or age > 150:
        raise ValueError(f"age must be between 0 and 150, got {age}")
    return age


try:
    set_age(-3)
except ValueError as err:
    print("rejected:", err)
