from enum import Enum


class Weekday(Enum):
    MON = 1
    TUE = 2
    SAT = 6
    SUN = 7

    @property
    def is_weekend(self):
        return self in (Weekday.SAT, Weekday.SUN)

    @classmethod
    def from_label(cls, label):
        return cls[label.upper()]


print(Weekday.SAT.is_weekend, Weekday.MON.is_weekend)
print(Weekday.from_label("tue"))
