import copy


class Report:
    def __init__(self, title, rows, log):
        self.title = title
        self.rows = rows
        self.log = log  # shared on purpose, never copied

    def __deepcopy__(self, memo):
        rows = copy.deepcopy(self.rows, memo)
        return Report(self.title, rows, self.log)


log = []
first = Report("Q1", [[1, 2]], log)
second = copy.deepcopy(first)
second.rows[0].append(3)
print(first.rows, second.rows, second.log is log)
