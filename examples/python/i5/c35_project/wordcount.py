"""Count words in text."""


def count_words(text):
    """Return a dict of lowercase word -> number of occurrences.

    >>> count_words("The cat and the hat")
    {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}
    """
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
