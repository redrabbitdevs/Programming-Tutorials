a = {1, 2, 3, 4}
b = {3, 4, 5}

print("union:", sorted(a | b))
print("intersection:", sorted(a & b))
print("difference:", sorted(a - b))
print("3 in a:", "yes" if 3 in a else "no")

unique = set([2, 7, 2, 2, 9, 7])
print("unique count:", len(unique))
