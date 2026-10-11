from collections import Counter

from .cleaning import normalise


def top_words(text, n):
    """Return the n most common words as (word, count) pairs."""
    return Counter(normalise(text)).most_common(n)
