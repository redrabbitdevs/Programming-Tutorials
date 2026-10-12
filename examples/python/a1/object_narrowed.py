def strict(value: object) -> int:
    if isinstance(value, int):
        return value.bit_length()
    return 0


print(strict(255), strict("255"))
