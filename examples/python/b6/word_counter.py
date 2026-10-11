"""Word-frequency counter: the finished mini-project."""

PUNCTUATION = ".,;:!?\"'()-"
REPORT_NAME = "word_report.txt"


def clean_word(raw):
    return raw.strip(PUNCTUATION).lower()


def count_words(text):
    counts = {}
    for raw in text.split():
        word = clean_word(raw)
        if word:
            counts[word] = counts.get(word, 0) + 1
    return counts


def top_words(counts, n):
    ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    return ranked[:n]


def read_text(filename):
    try:
        with open(filename, encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        return None


def ask_for_text():
    while True:
        filename = input("File to read: ").strip()
        text = read_text(filename)
        if text is None:
            print(f"Cannot find {filename!r}. Try again.")
        else:
            return filename, text


def ask_for_count():
    while True:
        answer = input("How many top words? ")
        try:
            n = int(answer)
        except ValueError:
            print("Please type a whole number.")
        else:
            if n < 1:
                print("The number must be at least 1.")
            else:
                return n


def write_report(rows, source):
    with open(REPORT_NAME, "w", encoding="utf-8") as file:
        print(f"Top words in {source}", file=file)
        for word, count in rows:
            print(f"{word:<8}{count:>3}", file=file)


def main():
    filename, text = ask_for_text()
    counts = count_words(text)
    n = ask_for_count()
    rows = top_words(counts, n)

    print()
    print(f"{len(counts)} different words, {sum(counts.values())} in total")
    for word, count in rows:
        print(f"{word:<8}{count:>3}")

    write_report(rows, filename)
    print(f"Report saved to {REPORT_NAME}")


main()
