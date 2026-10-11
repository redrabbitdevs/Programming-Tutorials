try:
    raise ValueError("lonely")
except* ValueError as group:
    print(type(group).__name__, [str(e) for e in group.exceptions])
