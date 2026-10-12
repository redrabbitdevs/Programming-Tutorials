import re

text = 'name="ada" role="admin"'
print(re.findall(r'"(.*)"', text))
print(re.findall(r'"(.*?)"', text))
print(repr(re.search(r"\d*", "abc123").group()))
