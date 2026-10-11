people = [
    {"name": "Ada", "team": "math", "age": 36},
    {"name": "Grace", "team": "navy", "age": 85},
    {"name": "Alan", "team": "math", "age": 41},
    {"name": "Katherine", "team": "nasa", "age": 101},
    {"name": "Barbara", "team": "math", "age": 36},
]

by_age = sorted(people, key=lambda p: (-p["age"], p["name"]))
for person in by_age:
    print(person["age"], person["name"])

math_names = sorted(p["name"] for p in people if p["team"] == "math")
print(math_names)
