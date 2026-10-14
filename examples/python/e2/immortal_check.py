import sys

values = [None, True, 7, (), "", 10**6, [1, 2]]
for value in values:
    print(f"{value!r:>9}  immortal: {sys._is_immortal(value)}")

print("huge refcount:", sys.getrefcount(None) > 2**30)
