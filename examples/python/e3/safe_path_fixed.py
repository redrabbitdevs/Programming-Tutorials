import os
import tempfile
from pathlib import Path


def safe_join(base, user_path):
    base = Path(base).resolve()
    target = (base / user_path).resolve()
    if not target.is_relative_to(base):
        raise ValueError(f"{user_path!r} is outside the upload folder")
    return target


with tempfile.TemporaryDirectory() as root:
    uploads = os.path.join(root, "uploads")
    for request in ["report.txt", "../secrets.env", "../uploads-old/a.db"]:
        try:
            target = safe_join(uploads, request)
            print("allowed:", target.relative_to(Path(root).resolve()))
        except ValueError as error:
            print("refused:", error)
