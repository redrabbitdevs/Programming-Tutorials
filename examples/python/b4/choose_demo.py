students = ["Ada", "Ben", "Cy"]
grades = {"Ada": "A", "Ben": "B", "Cy": "A"}
tags = {"python", "tutorial"}
origin = (0, 0)

# Ordered, may repeat, will change: list
students.append("Dee")

# Look up by name: dict
print(grades["Ben"])

# Does it exist, ignoring repeats: set
print("python" in tags)

# Fixed group, usable as a key: tuple
distances = {origin: 0, (1, 1): 2}
print(distances[(1, 1)])

# Group by a key, then count distinct members
by_grade = {}
for student, grade in grades.items():
    by_grade.setdefault(grade, set()).add(student)
print({g: sorted(s) for g, s in sorted(by_grade.items())})
