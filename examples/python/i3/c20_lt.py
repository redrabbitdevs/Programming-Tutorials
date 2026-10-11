class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def __repr__(self):
        return f"Version({self.major}, {self.minor})"

    def __lt__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor) < (other.major, other.minor)


versions = [Version(3, 12), Version(2, 7), Version(3, 9)]
print(sorted(versions))
print(min(versions), max(versions))
print(Version(3, 9) > Version(3, 8))
