first = "The cat sat on the mat"
second = "the dog sat"

only_first = set(first.lower().split()) - set(second.lower().split())
print(sorted(only_first))
