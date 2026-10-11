for text in ["12", "x", None]:
    try:
        print(int(text))
    except ValueError, TypeError:
        print("cannot convert", repr(text))
