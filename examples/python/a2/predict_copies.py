import copy

inner = [0]
outer = [inner, inner]
a = copy.copy(outer)
b = copy.deepcopy(outer)
a[0].append(1)
b[0].append(2)
print(outer)
print(a)
print(b)
