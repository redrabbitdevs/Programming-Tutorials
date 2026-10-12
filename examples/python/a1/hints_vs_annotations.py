import typing
from annotationlib import get_annotations
from typing import Annotated


class Base:
    id: int


class User(Base):
    name: Annotated[str, "max 20"]
    manager: User | None


print(get_annotations(User))
print(typing.get_type_hints(User))
hints = typing.get_type_hints(User, include_extras=True)
print(hints["name"], hints["name"].__metadata__)
