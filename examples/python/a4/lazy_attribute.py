class lazy:
    def __init__(self, func):
        self.func = func

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        value = self.func(obj)
        obj.__dict__[self.name] = value
        return value


class Report:
    def __init__(self, rows):
        self.rows = rows

    @lazy
    def total(self):
        print("computing total")
        return sum(self.rows)


report = Report([3, 4, 5])
print(report.total)
print(report.total)
print("total" in vars(report))
