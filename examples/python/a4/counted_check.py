from counted import counted


@counted
class Job:
    def __init__(self, name):
        self.name = name


Job("a")
Job("b")
print(Job.created, Job("c").name, Job.created)
