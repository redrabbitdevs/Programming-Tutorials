def parse_all(texts):
    numbers = []
    errors = []
    for text in texts:
        try:
            numbers.append(int(text))
        except ValueError as error:
            error.add_note(f"input: {text!r}")
            errors.append(error)
    if errors:
        raise ExceptionGroup("some inputs were invalid", errors)
    return numbers


try:
    parse_all(["1", "two", "3", "four"])
except* ValueError as group:
    for error in group.exceptions:
        print(error, error.__notes__)
