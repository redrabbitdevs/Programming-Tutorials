from operator import itemgetter

students = [
    {"name": "Zoe", "grade": "B"},
    {"name": "adam", "grade": "A"},
    {"name": "Bea", "grade": "B"},
    {"name": "carl", "grade": "A"},
]

# Grade A to Z, then name Z to A ignoring case: two stable passes.
step1 = sorted(students, key=lambda s: s["name"].casefold(), reverse=True)
step2 = sorted(step1, key=itemgetter("grade"))
print([(s["grade"], s["name"]) for s in step2])
