import json

try:
    json.loads("{'a': 1}")
except json.JSONDecodeError as error:
    print(error.msg, "| line", error.lineno, "column", error.colno)

try:
    json.dumps({"tags": {"x", "y"}})
except TypeError as error:
    print(error)

print(json.dumps({"tags": {"x", "y"}}, default=sorted))
