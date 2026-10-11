from typing import Protocol


class Exporter(Protocol):
    def export(self, rows: list[dict]) -> str: ...


class CsvExporter:
    def export(self, rows: list[dict]) -> str:
        lines = [",".join(str(v) for v in row.values()) for row in rows]
        return "\n".join(lines)


class CountExporter:
    def export(self, rows: list[dict]) -> str:
        return f"{len(rows)} rows"


def save(exporter: Exporter, rows: list[dict]) -> None:
    print(exporter.export(rows))


rows = [{"id": 1, "name": "pen"}, {"id": 2, "name": "ink"}]
save(CsvExporter(), rows)
save(CountExporter(), rows)
