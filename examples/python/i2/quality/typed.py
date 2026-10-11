def find_age(ages: dict[str, int], name: str) -> int | None:
    return ages.get(name)


def double(n: int) -> int:
    return n * 2


ages = {"ana": 31, "ben": 27}

print(double(find_age(ages, "ana")))
print(double("ab"))
