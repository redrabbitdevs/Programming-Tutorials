import sys

lazy import csv
lazy import json

print("json" in sys.modules)
json.dumps({})
print("json" in sys.modules, "csv" in sys.modules)
