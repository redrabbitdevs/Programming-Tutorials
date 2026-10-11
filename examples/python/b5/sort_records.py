people = [
    {"name": "Ada", "team": "math", "age": 36},
    {"name": "Grace", "team": "navy", "age": 85},
    {"name": "Alan", "team": "math", "age": 41},
    {"name": "Katherine", "team": "nasa", "age": 101},
    {"name": "Barbara", "team": "math", "age": 36},
]

# team A to Z, then oldest first, then name A to Z
ordered = sorted(people, key=lambda p: (p["team"], -p["age"], p["name"]))
for person in ordered:
    print(person["team"], person["age"], person["name"])
