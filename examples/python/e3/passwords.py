import hashlib
import os
import secrets


def hash_password(password, salt=None):
    """Return (salt, digest). A new random salt unless one is given."""
    salt = salt or os.urandom(16)
    digest = hashlib.scrypt(password.encode(), salt=salt,
                            n=2**14, r=8, p=1)
    return salt, digest


def check_password(password, salt, digest):
    _, candidate = hash_password(password, salt)
    return secrets.compare_digest(candidate, digest)


salt, digest = hash_password("correct horse")
print(len(salt), len(digest))
print(check_password("correct horse", salt, digest))
print(check_password("correct hors", salt, digest))
print(hash_password("correct horse")[1] == digest)
