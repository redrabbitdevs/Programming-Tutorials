"""Save and load short notes as text files, one file per title."""

from pathlib import Path


def save_note(folder, title, text):
    """Write text to <folder>/<title>.txt and return that path."""
    path = Path(folder) / f"{title}.txt"
    path.write_text(text, encoding="utf-8")
    return path


def load_note(folder, title):
    """Return the text of a saved note, or raise FileNotFoundError."""
    path = Path(folder) / f"{title}.txt"
    if not path.exists():
        raise FileNotFoundError(f"no note called {title!r}")
    return path.read_text(encoding="utf-8")
