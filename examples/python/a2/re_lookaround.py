import re

bill = "tea $3.50, cake $4, 12 items, water €2"
print(re.findall(r"(?<=\$)\d+(?:\.\d+)?", bill))
print(re.findall(r"\d+(?= items)", bill))
print(re.sub(r"(?<=\d)(?=(?:\d{3})+$)", ",", "1234567"))


def strong(password):
    return re.fullmatch(r"(?=.*\d)(?=.*[A-Z])\S{8,}", password) is not None


print([strong(p) for p in ["hunter22", "Hunter22", "Hu2"]])
