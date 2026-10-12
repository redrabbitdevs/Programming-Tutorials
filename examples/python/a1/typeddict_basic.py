from typing import TypedDict


class Movie(TypedDict):
    title: str
    year: int


film: Movie = {"title": "Alien", "year": 1979}
print(film["title"], film["year"])
print(type(film) is dict)
print(sorted(Movie.__required_keys__))
print(Movie(title="Heat", year=1995))
