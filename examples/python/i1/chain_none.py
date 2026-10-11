def load_port(text):
    try:
        return int(text)
    except ValueError:
        raise ValueError(f"invalid port setting: {text!r}") from None


try:
    load_port("80a")
except ValueError as error:
    print("error:  ", error)
    print("cause:  ", error.__cause__)
    print("context:", repr(error.__context__))
    print("hidden: ", error.__suppress_context__)
