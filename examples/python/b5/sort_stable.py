from operator import itemgetter

people = [
    {"name": "Ada", "team": "math", "age": 36},
    {"name": "Grace", "team": "navy", "age": 85},
    {"name": "Alan", "team": "math", "age": 41},
    {"name": "Katherine", "team": "nasa", "age": 101},
    {"name": "Barbara", "team": "math", "age": 36},
]

second = sorted(people, key=itemgetter("name"))
second = sorted(second, key=itemgetter("age"), reverse=True)
second = sorted(second, key=itemgetter("team"))
for person in second:
    print(person["team"], person["age"], person["name"])
