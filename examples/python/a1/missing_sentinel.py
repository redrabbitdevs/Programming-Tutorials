MISSING = sentinel("MISSING")


def first_word(
    text: str, default: str | None | MISSING = MISSING
) -> str | None:
    words = text.split()
    if words:
        return words[0]
    if default is MISSING:
        raise ValueError("empty text and no default")
    return default


print(first_word("hello world"), first_word("", None))
print(repr(MISSING))
try:
    first_word("   ")
except ValueError as error:
    print("ValueError:", error)
