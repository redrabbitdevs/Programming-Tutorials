"""Parse numbers typed by people: spaces, commas and underscores."""


def parse_number(text):
    """Return an int or a float for text such as ' 1,234 ' or '3.5'."""
    cleaned = text.strip().replace(",", "").replace("_", "")
    if not cleaned:
        raise ValueError("no number in empty text")
    try:
        return int(cleaned)
    except ValueError:
        return float(cleaned)
