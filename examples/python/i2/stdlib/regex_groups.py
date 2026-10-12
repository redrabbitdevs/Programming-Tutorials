import re

duration = "wait 90s then 15m"

match = re.search(r"(\d+)([hms])", duration)
print(match.group(0), match.group(1), match.group(2))

for amount, unit in re.findall(r"(\d+)([hms])", duration):
    print(amount, unit)
