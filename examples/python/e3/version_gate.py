import re

# re.prefixmatch is new in 3.15; re.match does the same job everywhere.
prefixmatch = getattr(re, "prefixmatch", re.match)

print(bool(prefixmatch(r"\d+", "42 apples")))
print(bool(prefixmatch(r"\d+", "apples 42")))
