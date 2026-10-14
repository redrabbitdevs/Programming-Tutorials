import re

print(re.fullmatch(r"\d+5", "12345"))
print(re.fullmatch(r"\d++5", "12345"))
print(re.fullmatch(r"(?>\d+)5", "12345"))
