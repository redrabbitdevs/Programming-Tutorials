from typing import Annotated

from validator import Range, validate


class Reading:
    sensor: str
    celsius: Annotated[float, Range(-40, 60)]


print(validate(Reading, {"sensor": "t1", "celsius": 21.5}))
print(validate(Reading, {"sensor": "t1", "celsius": 99.0}))
print(validate(Reading, {"sensor": 7, "celsius": "hot"}))
