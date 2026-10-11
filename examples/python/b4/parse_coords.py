def parse_point(text):
    x_text, y_text = text.split(",")
    return int(x_text), int(y_text)


for raw in ["3,4", " 10, -2 ", "7,x", "1,2,3"]:
    try:
        print(parse_point(raw))
    except ValueError as error:
        print(f"bad input {raw!r}: {error}")
