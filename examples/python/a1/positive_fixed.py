def show(value: int | str) -> str:
    if isinstance(value, str):
        return value.upper()
    if value > 0:
        return f"+{value}"
    return str(value)


values: list[int | str] = [5, "abc", -5]
for value in values:
    print(show(value))
