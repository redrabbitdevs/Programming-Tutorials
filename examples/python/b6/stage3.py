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


def read_text(filename):
    try:
        with open(filename, encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        return None


for name in ["sample.txt", "missing.txt"]:
    text = read_text(name)
    if text is None:
        print(name, "-> not found")
    else:
        counts = count_words(text)
        print(name, "->", len(counts), "different words,", sum(counts.values()), "in total")
