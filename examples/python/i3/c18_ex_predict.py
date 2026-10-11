class A:
    def __init__(self):
        print("A starts")
        self.tag = "A"


class B(A):
    def __init__(self):
        print("B starts")
        super().__init__()
        self.tag = self.tag + "B"


class C(B):
    def __init__(self):
        super().__init__()
        print("C starts")
        self.tag = self.tag + "C"


print(C().tag)
