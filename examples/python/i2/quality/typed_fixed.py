def find_age(ages: dict[str, int], name: str) -> int | None:
    return ages.get(name)


def double(n: int) -> int:
    return n * 2


ages = {"ana": 31, "ben": 27}

age = find_age(ages, "ana")
if age is not None:
    print(double(age))
print(double(21))
