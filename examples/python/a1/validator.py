from typing import Annotated, get_type_hints


class Range:
    def __init__(self, low: float, high: float) -> None:
        self.low, self.high = low, high


def validate(cls: type, data: dict[str, object]) -> list[str]:
    errors = []
    for name, hint in get_type_hints(cls, include_extras=True).items():
        value = data.get(name)
        base = getattr(hint, "__origin__", hint)
        if not isinstance(value, base):
            errors.append(f"{name}: expected {base.__name__}")
            continue
        for meta in getattr(hint, "__metadata__", ()):
            if isinstance(meta, Range) and not meta.low <= value <= meta.high:
                errors.append(f"{name}: {value} out of range")
    return errors
