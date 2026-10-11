class Point:
    def merge(self, other: "Point") -> "Point":
        return self


p = Point()
print(p.merge(p) is p)
