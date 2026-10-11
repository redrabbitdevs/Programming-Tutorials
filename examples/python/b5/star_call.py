def total(*numbers):
    return sum(numbers)


def describe(**details):
    return details


values = [4, 5, 6]
print(total(*values))

options = {"name": "Grace", "born": 1906}
print(describe(**options))
