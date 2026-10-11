try:
    raise ExceptionGroup("g", [ValueError(1), TypeError(2), ValueError(3)])
except* TypeError as group:
    print("T", len(group.exceptions))
except* ValueError as group:
    print("V", len(group.exceptions))
