def repeat_word(word: str, times: int | None = None) -> str:
    if times is None:
        return word
    return word * times


print(repeat_word("hi", 3))
print(repeat_word("hi"))
