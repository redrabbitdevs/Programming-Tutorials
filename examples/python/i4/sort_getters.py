from dataclasses import dataclass
from operator import attrgetter, itemgetter

rows = [("ada", 31), ("grace", 28), ("alan", 41)]
print(sorted(rows, key=itemgetter(1)))

records = [{"name": "ada", "score": 90}, {"name": "alan", "score": 75}]
print(sorted(records, key=itemgetter("score")))
print(itemgetter("name", "score")(records[0]))


@dataclass
class Player:
    name: str
    points: int


players = [Player("ada", 5), Player("alan", 9)]
print([p.name for p in sorted(players, key=attrgetter("points"), reverse=True)])
