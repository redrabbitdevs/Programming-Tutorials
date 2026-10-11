def total(*numbers):
    print(type(numbers).__name__, numbers)
    return sum(numbers)


def describe(**details):
    print(type(details).__name__, details)
    for key, value in details.items():
        print(f"  {key} -> {value}")


print(total())
print(total(1, 2, 3))

describe(name="Ada", born=1815)

values = [4, 5, 6]
print(total(*values))

options = {"name": "Grace", "born": 1906}
describe(**options)


def log(level, *messages, **extras):
    print(level, messages, extras)


log("INFO", "started", "ok", user="ada", retry=False)
