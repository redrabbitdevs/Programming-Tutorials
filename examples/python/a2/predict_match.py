def check(value):
    match value:
        case [x, y]:
            return f"pair {x} {y}"
        case {"id": n}:
            return f"id {n}"
        case str(s):
            return f"text {s}"
    return "no match"


print(check("ab"))
print(check({"id": 1, "x": 2}))
print(check((1, 2)))
print(check({"x": 1}))
