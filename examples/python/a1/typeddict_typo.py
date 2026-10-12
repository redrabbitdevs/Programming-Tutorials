from typing import TypedDict


class Movie(TypedDict):
    title: str
    year: int


film: Movie = {"title": "Alien", "yaer": 1979}
print(film)
