import sys

data = [1, 2, 3]
before = sys.getrefcount(data)

alias = data
holder = {"key": data}
print(sys.getrefcount(data) - before)

del alias
print(sys.getrefcount(data) - before)

holder.clear()
print(sys.getrefcount(data) - before)
