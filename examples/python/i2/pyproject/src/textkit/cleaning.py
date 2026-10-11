PUNCTUATION = ".,!?;:\"'()"


def normalise(text):
    """Return the lower-case words of text with punctuation trimmed off."""
    words = [word.strip(PUNCTUATION) for word in text.lower().split()]
    return [word for word in words if word]
