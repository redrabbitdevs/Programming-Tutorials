from dataclasses import dataclass


@dataclass
class Ok[T]:
    value: T


@dataclass
class Err[E]:
    error: E


type Result[T, E = str] = Ok[T] | Err[E]


def parse_int(text: str) -> Result[int]:
    if text.strip().lstrip("-").isdigit():
        return Ok(int(text))
    return Err(f"not a number: {text!r}")


for text in ["42", "-7", "4x"]:
    result = parse_int(text)
    print(result.value * 2 if isinstance(result, Ok) else result.error)
