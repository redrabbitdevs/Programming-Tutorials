def parse_number(value):
    for convert in (int, float):
        try:
            return convert(value)
        except (ValueError, TypeError):
            continue
    return None


for item in ["42", "3.5", " 7 ", "abc", None, "1e3"]:
    print(repr(item), "->", parse_number(item))
