from dataclasses import dataclass


@dataclass(order=True)
class Version:
    major: int
    minor: int


versions = [Version(3, 12), Version(2, 7), Version(3, 9)]
print(sorted(versions))
print(Version(3, 9) < Version(3, 12))
