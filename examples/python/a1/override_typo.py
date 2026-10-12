from typing import override


class Report:
    def render(self) -> str:
        return "report"


class SalesReport(Report):
    @override
    def rendr(self) -> str:
        return "sales"


print(SalesReport().render())
