def check(form):
    problems = []
    if not form.get("name"):
        problems.append(ValueError("name is empty"))
    if not isinstance(form.get("age"), int):
        problems.append(TypeError("age must be a whole number"))
    if problems:
        raise ExceptionGroup("invalid form", problems)


try:
    check({"name": "", "age": "x"})
except* ValueError as group:
    print("value problems:", [str(e) for e in group.exceptions])
except* TypeError as group:
    print("type problems:", [str(e) for e in group.exceptions])
