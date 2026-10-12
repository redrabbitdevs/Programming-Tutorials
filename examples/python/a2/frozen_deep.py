from dataclasses import dataclass


@dataclass(frozen=True)
class Team:
    name: str
    members: tuple[str, ...]

    def __post_init__(self):
        object.__setattr__(self, "members", tuple(self.members))


team = Team("core", ["ada", "ben"])
print(team)
print(hash(team) == hash(Team("core", ("ada", "ben"))))
