from typing import Literal, get_args

Align = Literal["left", "right", "center"]


def pad(text: str, width: int, align: Align = "left") -> str:
    if align == "left":
        return text.ljust(width)
    if align == "right":
        return text.rjust(width)
    return text.center(width)


print(f"[{pad('ok', 6)}]")
print(f"[{pad('ok', 6, 'right')}]")
print(f"[{pad('ok', 6, 'middle')}]")
print(get_args(Align))
