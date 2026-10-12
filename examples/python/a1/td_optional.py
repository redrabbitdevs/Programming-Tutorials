from typing import NotRequired, TypedDict


class User(TypedDict):
    id: int
    name: str
    nickname: NotRequired[str]


ada: User = {"id": 1, "name": "Ada"}
bob: User = {"id": 2, "name": "Robert", "nickname": "Bob"}
for user in (ada, bob):
    print(user["name"], "/", user.get("nickname", "-"))
print(sorted(User.__required_keys__), sorted(User.__optional_keys__))
