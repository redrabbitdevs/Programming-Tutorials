from operator import itemgetter

people = [("grace", "B"), ("alan", "A"), ("ada", "B"), ("barbara", "A")]

by_group = sorted(people, key=itemgetter(1))
print(by_group)

# Sort by name first, then by group. Names stay ordered inside each group.
step1 = sorted(people, key=itemgetter(0))
step2 = sorted(step1, key=itemgetter(1))
print(step2)

# reverse=True keeps equal items in their original order too.
print(sorted(people, key=itemgetter(1), reverse=True))
