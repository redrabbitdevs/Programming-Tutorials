import copy

UNSET = sentinel("UNSET")
OTHER = sentinel("UNSET")

print(f"value: {UNSET}")
print(UNSET is copy.copy(UNSET), UNSET == OTHER)
print("truthy" if UNSET else "falsy")
print(type(UNSET).__name__, UNSET.__name__)
