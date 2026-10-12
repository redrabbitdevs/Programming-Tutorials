import re

print(re.findall(r"\d{4}", "2026-10-12"))
print(re.findall(r"[0-9]+", "12/10/2026"))
print(re.findall(r"\w+", "id_42, x-ray"))
print(re.findall(r"\s+", "a  b\tc"))
print(re.findall(r"colou?r", "color colour colouur"))
print(re.findall(r"^\w+|\w+$", "first middle last"))
