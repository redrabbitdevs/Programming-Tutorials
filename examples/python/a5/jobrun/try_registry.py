from dataclasses import dataclass
from typing import Self

from jobrun.plugin import REGISTRY, Plugin


@dataclass(frozen=True)
class Shout(Plugin[str], kind="shout"):
    text: str

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        return cls(job_id, str(params["text"]))

    def render(self, value: str) -> str:
        return value.upper() + "!"


print(REGISTRY)
job = REGISTRY["shout"].from_params("s1", {"text": "hello"})
print(job, job.kind, job.render("hello"))

try:
    class Loud(Plugin[str], kind="shout"): ...
except TypeError as error:
    print("Loud:", error)

try:
    class Quiet(Plugin[str]): ...
except TypeError as error:
    print("Quiet:", error)
