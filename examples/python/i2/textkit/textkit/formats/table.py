from ..counting import top_words


def render(text, n):
    """Return the top n words as aligned text lines."""
    rows = top_words(text, n)
    width = max(len(word) for word, _ in rows)
    return "\n".join(f"{word:<{width}}  {count}" for word, count in rows)
