import os
import tempfile


def safe_join(base, user_path):
    target = os.path.normpath(os.path.join(base, user_path))
    if not target.startswith(base):
        raise ValueError(f"{user_path!r} is outside the upload folder")
    return target


with tempfile.TemporaryDirectory() as root:
    uploads = os.path.join(root, "uploads")
    for request in ["report.txt", "../secrets.env", "../uploads-old/a.db"]:
        try:
            target = safe_join(uploads, request)
            print("allowed:", os.path.relpath(target, root))
        except ValueError as error:
            print("refused:", error)
