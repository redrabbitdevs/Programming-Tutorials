"""Small text helpers used as the code under test."""


def slugify(text):
    """Turn a title into a lowercase, hyphen-separated slug."""
    words = "".join(ch.lower() if ch.isalnum() else " " for ch in text).split()
    return "-".join(words)


def average(numbers):
    """Return the mean of a non-empty sequence of numbers."""
    if not numbers:
        raise ValueError("average() needs at least one number")
    return sum(numbers) / len(numbers)
