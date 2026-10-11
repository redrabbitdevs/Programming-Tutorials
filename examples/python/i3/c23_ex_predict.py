from enum import Enum, IntEnum


class Plain(Enum):
    ONE = 1


class Number(IntEnum):
    ONE = 1


print(Plain.ONE == 1)
print(Number.ONE == 1)
print(Number.ONE == Plain.ONE)
print(Number.ONE + 1)
