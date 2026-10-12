from typing import Protocol


class Logger(Protocol):
    def __call__(self, message: str, *, level: str = "INFO") -> None: ...


class Collector:
    def __init__(self) -> None:
        self.lines: list[str] = []

    def __call__(self, message: str, *, level: str = "INFO") -> None:
        self.lines.append(f"{level}:{message}")


def run_job(log: Logger) -> None:
    log("starting")
    log("disk almost full", level="WARN")


collector = Collector()
run_job(collector)
print(collector.lines)
