import re

line = "order 4521 shipped on 2026-10-12"

print(re.findall(r"\d+", line))
print(re.findall(r"(\d+)-(\d+)-(\d+)", line))
