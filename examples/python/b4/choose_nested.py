grades = {"Ada": "A", "Ben": "B", "Cy": "A"}

by_grade = {}
for student, grade in grades.items():
    by_grade.setdefault(grade, set()).add(student)

for grade in sorted(by_grade):
    print(grade, sorted(by_grade[grade]))
