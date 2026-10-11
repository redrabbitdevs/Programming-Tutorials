defaults = {"theme": "light", "font": 12, "lang": "en"}
user = {"theme": "dark", "font": 14}

merged = defaults | user
print(merged)
print(defaults)

defaults |= {"lang": "fr"}
print(defaults)

# The older spelling, which works everywhere
print({**defaults, **user})

# Later values win
print({"a": 1} | {"a": 2})
