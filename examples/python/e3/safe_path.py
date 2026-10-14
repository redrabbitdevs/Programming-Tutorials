import tempfile
from pathlib import Path


def safe_join(base, user_path):
    """Resolve user_path inside base, or refuse."""
    base = base.resolve()
    target = (base / user_path).resolve()
    if not target.is_relative_to(base):
        raise ValueError(f"{user_path!r} is outside the upload folder")
    return target


with tempfile.TemporaryDirectory() as root:
    uploads = Path(root, "uploads")
    uploads.mkdir()
    for request in ["report.txt", "2026/march.csv",
                    "../secrets.env", "/etc/passwd"]:
        try:
            target = safe_join(uploads, request)
            print("allowed:", target.relative_to(uploads.resolve()))
        except ValueError as error:
            print("refused:", error)
