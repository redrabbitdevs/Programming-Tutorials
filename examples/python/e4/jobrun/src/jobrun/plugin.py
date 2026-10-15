from dataclasses import dataclass
from typing import Any, ClassVar, Self

from .models import Context


@dataclass(frozen=True)
class Plugin[T]:
    """One job. T is the type of the value that run() produces."""

    kind: ClassVar[str]
    job_id: str

    def __init_subclass__(cls, /, kind: str, **kwargs: Any) -> None:
        super().__init_subclass__(**kwargs)
        if kind in REGISTRY:
            raise TypeError(f"plugin kind {kind!r} is already registered")
        cls.kind = kind
        REGISTRY[kind] = cls

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        raise NotImplementedError

    async def run(self, ctx: Context) -> T:
        raise NotImplementedError

    def render(self, value: T) -> str:
        return str(value)


# Defined after the class, because its annotation names the class. Subclasses
# are created later, so __init_subclass__ always finds it.
REGISTRY: dict[str, type[Plugin[Any]]] = {}
