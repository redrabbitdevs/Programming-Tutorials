class Loud:
    def __get__(self, obj, objtype=None):
        print(f"__get__(obj={obj!r}, objtype={objtype.__name__})")
        return 42


class Thing:
    answer = Loud()

    def __repr__(self):
        return "Thing()"


print(Thing().answer)
print(Thing.answer)
