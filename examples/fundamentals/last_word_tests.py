def last_word(text):
    words = text.split()
    if not words:
        return ""
    return words[-1]


cases = [
    ("the quick fox", "fox"),
    ("one", "one"),
    ("  hi  ", "hi"),
    ("", ""),
]
for text, expected in cases:
    actual = last_word(text)
    status = "PASS" if actual == expected else "FAIL"
    print(status, repr(text), "->", repr(actual))
