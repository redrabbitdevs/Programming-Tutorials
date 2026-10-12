import re

text = "call 555-0134 or 555-0188"

print(re.sub(r"\d{3}-(\d{4})", r"xxx-\1", text))
print(re.sub(r"\s+", " ", "too    many\n spaces"))
