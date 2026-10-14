import re

print(re.findall(r"\d+(?=px)", "10px 2em 30px"))
print(re.findall(r"(?<!-)\b\d+", "-5 7 -12 40"))
print(re.sub(r"(?=\d{3}$)", ".", "1999"))
