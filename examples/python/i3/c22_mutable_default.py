from dataclasses import dataclass

try:

    @dataclass
    class Basket:
        owner: str
        items: list[str] = []

except ValueError as error:
    print("ValueError:", error)
