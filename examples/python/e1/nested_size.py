import sys

flat = [0] * 1_000
nested = [flat]
copies = [flat] * 1_000

print(sys.getsizeof(flat))
print(sys.getsizeof(nested))
print(sys.getsizeof(copies))
