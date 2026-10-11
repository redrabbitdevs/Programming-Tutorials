from enum import Enum


class Light(Enum):
    RED = "red"
    YELLOW = "yellow"
    GREEN = "green"


def action(light):
    match light:
        case Light.RED:
            return "stop"
        case Light.YELLOW:
            return "slow down"
        case Light.GREEN:
            return "go"


for light in Light:
    print(light.name, "->", action(light))
