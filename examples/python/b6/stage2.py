PUNCTUATION = ".,;:!?\"'()-"


def clean_word(raw):
    return raw.strip(PUNCTUATION).lower()


def count_words(text):
    counts = {}
    for raw in text.split():
        word = clean_word(raw)
        if word:
            counts[word] = counts.get(word, 0) + 1
    return counts


print(clean_word('"Mat?"'), clean_word("Café,"), repr(clean_word("--")))
print(count_words('The cat. "The" CAT! the - dog'))
