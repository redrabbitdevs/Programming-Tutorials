def full_name(first: str, last: str) -> str:
    return f"{first} {last}"


def mean(values: list[float]) -> float:
    return sum(values) / len(values)


def first_word(text: str) -> str | None:
    words = text.split()
    if not words:
        return None
    return words[0]


def word_lengths(words: list[str]) -> dict[str, int]:
    return {word: len(word) for word in words}


def announce(message: str, repeat: int = 1) -> None:
    for _ in range(repeat):
        print(message)


print(full_name("Ada", "Lovelace"))
print(mean([1.5, 2.5, 5.0]))
print(first_word("hello there"), first_word("   "))
print(word_lengths(["a", "bcd"]))
announce("hi", 2)
