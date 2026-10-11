try:
    try:
        raise ExceptionGroup("batch", [ValueError("a"), KeyError("b")])
    except* ValueError as group:
        print("inner handled:", [str(e) for e in group.exceptions])
except ExceptionGroup as rest:
    print("outer got:", rest)
    print([repr(e) for e in rest.exceptions])
