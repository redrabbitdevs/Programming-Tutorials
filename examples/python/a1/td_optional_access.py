from typing import NotRequired, TypedDict


class User(TypedDict):
    id: int
    nickname: NotRequired[str]


def shout(user: User) -> str:
    return user["nickname"].upper()


try:
    print(shout({"id": 1}))
except KeyError as error:
    print("KeyError:", error)
