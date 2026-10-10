import sys

major, minor = sys.version_info[:2]
print(f"Running Python {major}.{minor}")
print("At least 3.11:", (major, minor) >= (3, 11))
