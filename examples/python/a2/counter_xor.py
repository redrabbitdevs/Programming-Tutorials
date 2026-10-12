from collections import Counter

monday = Counter(tea=3, coffee=5)
tuesday = Counter(tea=1, coffee=5, juice=2)
print(monday ^ tuesday)
