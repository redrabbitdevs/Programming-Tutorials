import re

html = "<b>bold</b> and <i>italic</i>"
print(re.findall(r"<.+>", html))
print(re.findall(r"<.+?>", html))
print(re.findall(r"<[^>]+>", html))
