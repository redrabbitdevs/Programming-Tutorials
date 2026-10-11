from enum import IntEnum


class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3


print(Priority.HIGH == 3)
print(Priority.HIGH > Priority.LOW)
print(sorted([Priority.HIGH, Priority.LOW, Priority.MEDIUM]))
print(Priority.MEDIUM + 1)
