ages = {"Ada": 37, "Alan": 41, "Grace": 85}
del ages["Alan"]
print(ages.pop("Grace"), ages)
print(ages.pop("Nobody", "not there"))
