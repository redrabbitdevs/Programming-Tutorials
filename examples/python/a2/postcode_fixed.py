import re


def is_postcode(text):
    return re.fullmatch(r"\d{4} ?[A-Z]{2}", text) is not None


for code in ["1234 AB", "1234AB", "x1234 ABCD", "12345 AB"]:
    print(code, is_postcode(code))
