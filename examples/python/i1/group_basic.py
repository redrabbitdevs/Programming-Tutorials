problems = [ValueError("name is empty"), TypeError("age must be a number")]
group = ExceptionGroup("invalid form", problems)

print(group)
print(len(group.exceptions))
for problem in group.exceptions:
    print(" -", repr(problem))
