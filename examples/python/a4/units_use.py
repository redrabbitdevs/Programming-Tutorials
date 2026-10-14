import warnings

import units

with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter("always")
    print(units.to_km(10))
print(caught[0].category.__name__, caught[0].message)
print(units.kilometres(1))
try:
    units.to_metres
except AttributeError as error:
    print("AttributeError:", error)
