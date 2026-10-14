from collections import UserDict


class LowerDict(dict):
    def __setitem__(self, key, value):
        super().__setitem__(key.lower(), value)


class LowerUserDict(UserDict):
    def __setitem__(self, key, value):
        super().__setitem__(key.lower(), value)


for cls in (LowerDict, LowerUserDict):
    d = cls({"Host": "db"})
    d.update(Port=5432)
    d["USER"] = "ada"
    print(cls.__name__, sorted(d))
