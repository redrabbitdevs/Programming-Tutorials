from dataclasses import dataclass


@dataclass
class Click:
    x: int
    y: int


@dataclass
class Key:
    name: str


@dataclass
class Quit:
    pass


type Event = Click | Key | Quit
