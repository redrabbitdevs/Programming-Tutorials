import re

text = "first line\nsecond line\nthird"
print(re.findall(r"^\w+", text))
print(re.findall(r"^\w+", text, re.MULTILINE))
