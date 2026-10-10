def average(scores):
    return sum(scores) / len(scores)


def letter_grade(avg):
    if avg >= 85:
        return "A"
    if avg >= 70:
        return "B"
    return "C"


def report(name, scores):
    avg = average(scores)
    print(name, f"{avg:.1f}", letter_grade(avg))


report("Ana", [80, 90, 70])
report("Ben", [60, 65, 90])
report("Chi", [95, 92, 98])
