def describe(value):
    match value:
        case bool(flag):
            return f"flag {flag}"
        case int(n) | float(n):
            return f"number {n}"
        case str() as text if text.isdigit():
            return f"digits {text}"
        case str(text):
            return f"text {text!r}"
        case [int(), int()] as pair:
            return f"int pair {pair}"
        case [*items]:
            return f"sequence of {len(items)}"
        case _:
            return f"other {type(value).__name__}"


for value in [True, 3, 2.5, "42", "hi", [1, 2], (1, "a", None), {"a": 1}]:
    print(describe(value))
