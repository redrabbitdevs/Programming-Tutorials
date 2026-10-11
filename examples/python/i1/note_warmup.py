def read_age(text):
    try:
        return int(text)
    except ValueError as error:
        error.add_note("while reading the age field")
        raise


try:
    read_age("abc")
except ValueError as error:
    print(error)
    print(error.__notes__)
