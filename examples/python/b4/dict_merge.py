defaults = {"theme": "light", "font": 12, "lang": "en"}
user = {"theme": "dark", "font": 14}

merged = defaults | user
print(merged)
print(defaults)
