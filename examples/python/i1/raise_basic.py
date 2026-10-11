def set_age(age):
    if age < 0:
        raise ValueError(f"age cannot be negative: {age}")
    return age


try:
    set_age(-3)
except ValueError as error:
    print("Caught:", error)
    print(error.args)
