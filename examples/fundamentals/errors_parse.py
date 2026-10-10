for text in ["42", "forty-two"]:
    try:
        n = int(text)
    except ValueError:
        print(f"{text!r} is not a number")
    else:
        print(f"{text!r} -> {n}")
