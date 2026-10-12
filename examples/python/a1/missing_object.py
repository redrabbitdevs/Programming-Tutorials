_MISSING = object()


def first_word(text: str, default=_MISSING):
    words = text.split()
    if words:
        return words[0]
    if default is _MISSING:
        raise ValueError("empty text and no default")
    return default


print(first_word("hello world"), first_word("", None))
print(repr(_MISSING).startswith("<object object at 0x"))
