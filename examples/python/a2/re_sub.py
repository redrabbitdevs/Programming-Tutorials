import re

text = "Call 555-1234 or 555-9876."
print(re.sub(r"\d{3}-\d{4}", "XXX-XXXX", text))
print(re.sub(r"(\d{3})-(\d{4})", r"\2-\1", text))
print(re.sub(r"(?P<area>\d{3})-\d{4}", r"\g<area>-****", text))


def shout(m):
    return m.group(0).upper()


print(re.sub(r"\b[a-z]{2}\b", shout, "go to it or else"))
