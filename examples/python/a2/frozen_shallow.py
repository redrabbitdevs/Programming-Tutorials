from dataclasses import dataclass


@dataclass(frozen=True)
class Team:
    name: str
    members: list[str]


team = Team("core", ["ada"])
team.members.append("ben")
print(team)
try:
    hash(team)
except TypeError as error:
    print("TypeError:", error)
