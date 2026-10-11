from abc import ABC, abstractmethod


class Report(ABC):
    @abstractmethod
    def body(self):
        """Return the report text."""

    def render(self):
        return f"=== report ===\n{self.body()}\n=== end ==="


class SalesReport(Report):
    def body(self):
        return "sales: 42"


print(SalesReport().render())
