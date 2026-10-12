from typing import NamedTuple


class Version(NamedTuple):
    major: int
    minor: int
    patch: int = 0

    def __str__(self):
        return f"{self.major}.{self.minor}.{self.patch}"


versions = [Version(3, 15), Version(3, 9, 2), Version(3, 14, 8)]
print(Version._fields)
print(max(versions), min(versions))
print(repr(versions[0]))
