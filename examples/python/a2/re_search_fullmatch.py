import re

text = "Order 1042 shipped, order 77 pending"
print(re.search(r"\d+", text))
print(re.findall(r"\d+", text))
print(re.fullmatch(r"\d+", "1042"))
print(re.fullmatch(r"\d+", "1042a"))
