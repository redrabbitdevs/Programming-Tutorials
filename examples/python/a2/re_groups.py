import re

line = "2026-10-12 14:03 ERROR disk full"
m = re.search(r"(\d{4})-(\d{2})-(\d{2})", line)
print(m.group(0), m.group(1))
print(m.groups())

pattern = r"(?P<date>\S+) (?P<time>\S+) (?P<level>[A-Z]+) (?P<msg>.*)"
m = re.fullmatch(pattern, line)
print(m["level"], m["msg"])
print(m.groupdict())

prices = "tea 2.50, cake 3.75, water 1"
print(re.findall(r"(\w+) (\d+(?:\.\d+)?)", prices))
for m in re.finditer(r"(\w+) (\d+(?:\.\d+)?)", prices):
    print(m.group(1), m.span())
