from enum import StrEnum, auto


class Status(StrEnum):
    PENDING = auto()
    DONE = auto()


print(Status.PENDING == "pending")
print(Status("done"))
print(f"status is {Status.DONE}")
print(Status.DONE.upper())
