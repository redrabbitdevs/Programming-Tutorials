def age_of(person):
    return person[1]


people = [("Ana", 30), ("Ben", 25), ("Cy", 30), ("Di", 25)]
for name, age in sorted(people, key=age_of):
    print(name, age)
