from dataclasses import dataclass


@dataclass
class Circle:
    radius: float


@dataclass
class Square:
    side: float


type Shape = Circle | Square
