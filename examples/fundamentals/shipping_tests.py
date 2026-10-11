def shipping_buggy(w):
    if w < 0:
        raise ValueError("weight must be positive")
    if w < 1:
        return 5
    if w <= 5:
        return 8
    return 10


def shipping_fixed(w):
    if w <= 0:
        raise ValueError("weight must be positive")
    if w <= 1:
        return 5
    if w <= 5:
        return 8
    return 12


def raises_value_error(func, arg):
    try:
        func(arg)
    except ValueError:
        return True
    return False


def run_tests(func):
    failures = []
    cases = [
        ("light parcel", 0.5, 5),
        ("exactly 1 kg", 1, 5),
        ("medium parcel", 3, 8),
        ("exactly 5 kg", 5, 8),
        ("heavy parcel", 6, 12),
    ]
    for name, weight, expected in cases:
        actual = func(weight)
        if actual != expected:
            failures.append(f"{name}: expected {expected}, got {actual}")
    if not raises_value_error(func, 0):
        failures.append("zero weight: expected ValueError")
    return failures


for label, func in [("buggy", shipping_buggy), ("fixed", shipping_fixed)]:
    failures = run_tests(func)
    print(label + ":", len(failures), "failed")
    for line in failures:
        print("  " + line)
