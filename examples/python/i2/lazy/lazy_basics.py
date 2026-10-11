import sys
import types

lazy import statistics

print("statistics" in sys.modules)
print(type(globals()["statistics"]) is types.LazyImportType)

print(statistics.mean([2, 4, 9]))

print("statistics" in sys.modules)
print(type(globals()["statistics"]) is types.LazyImportType)
