from enum import Enum


class Light(Enum):
    RED = "red"
    GREEN = "green"
    YELLOW = "yellow"

    def next(self):
        order = {
            Light.RED: Light.GREEN,
            Light.GREEN: Light.YELLOW,
            Light.YELLOW: Light.RED,
        }
        return order[self]

    @property
    def can_go(self):
        return self is Light.GREEN


light = Light.RED
for step in range(4):
    print(step, light.name, "go" if light.can_go else "wait")
    light = light.next()
