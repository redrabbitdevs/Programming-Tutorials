class Reading:
    def __init__(self, sensor, value):
        self.sensor = sensor
        self.value = value


reading = Reading("temp", 21.5)

match reading:
    case Reading(sensor="temp", value=v):
        print("keyword pattern:", v)

try:
    match reading:
        case Reading("temp", v):
            print("positional pattern:", v)
except TypeError as error:
    print("TypeError:", error)


class Reading:
    __match_args__ = ("sensor", "value")

    def __init__(self, sensor, value):
        self.sensor = sensor
        self.value = value


match Reading("temp", 21.5):
    case Reading("temp", v):
        print("positional pattern:", v)
