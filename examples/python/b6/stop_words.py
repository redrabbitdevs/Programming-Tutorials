PUNCTUATION = ".,;:!?\"'()-"
STOP_WORDS = {"the", "on"}


def clean_word(raw):
    return raw.strip(PUNCTUATION).lower()


def count_words(text):
    counts = {}
    for raw in text.split():
        word = clean_word(raw)
        if word and word not in STOP_WORDS:
            counts[word] = counts.get(word, 0) + 1
    return counts


def top_words(counts, n):
    ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    return ranked[:n]


with open("sample.txt", encoding="utf-8") as file:
    counts = count_words(file.read())

for word, count in top_words(counts, 3):
    print(f"{word:<8}{count:>3}")
