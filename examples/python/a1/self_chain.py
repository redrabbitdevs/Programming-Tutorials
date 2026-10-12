from typing import Self, reveal_type


class Query:
    def __init__(self) -> None:
        self.parts: list[str] = []

    def where(self, condition: str) -> Self:
        self.parts.append(condition)
        return self


class UserQuery(Query):
    def active(self) -> Self:
        return self.where("active = 1")


q = UserQuery().where("age > 30").active()
reveal_type(q)
print(type(q).__name__, q.parts)
