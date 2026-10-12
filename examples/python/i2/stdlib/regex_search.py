import re

line = "order 4521 shipped on 2026-10-12"

match = re.search(r"\d+", line)
print(match)
print(match.group())
print(re.search(r"refund", line))
