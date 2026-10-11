def check_all(values):
    problems = []
    for value in values:
        if not isinstance(value, int):
            problems.append(TypeError(f"not an int: {value!r}"))
        elif value < 0:
            problems.append(ValueError(f"negative: {value}"))
    if problems:
        raise ExceptionGroup("bad values", problems)


try:
    check_all([3, -5, "x", -1, 8.5])
except* ValueError as group:
    print("negative:", [str(e) for e in group.exceptions])
except* TypeError as group:
    print("not int:", [str(e) for e in group.exceptions])
