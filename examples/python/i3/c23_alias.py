from enum import Enum


class Status(Enum):
    OK = 1
    SUCCESS = 1  # same value: an alias, not a new member
    FAILED = 2


print(Status.SUCCESS is Status.OK)
print(list(Status))
