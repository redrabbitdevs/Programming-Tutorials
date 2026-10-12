import warnings
from datetime import UTC, datetime

with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter("always")
    old = datetime.utcfromtimestamp(0)

print(caught[0].category.__name__)
print(old, old.tzinfo)

new = datetime.fromtimestamp(0, tz=UTC)
print(new, new.tzinfo)
