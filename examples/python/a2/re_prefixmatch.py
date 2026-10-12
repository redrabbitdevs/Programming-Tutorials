import re

number = re.compile(r"\d+")
for text in ["42 apples", "apples: 42"]:
    at_start = number.prefixmatch(text)
    anywhere = number.search(text)
    print(repr(text), at_start is not None, anywhere.group())

print(re.prefixmatch(r"\d+", "7 days").group())
