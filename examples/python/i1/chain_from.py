def load_port(text):
    try:
        return int(text)
    except ValueError as error:
        raise ValueError(f"invalid port setting: {text!r}") from error


try:
    load_port("80a")
except ValueError as error:
    print("error: ", error)
    print("cause: ", repr(error.__cause__))
    print("hidden:", error.__suppress_context__)
