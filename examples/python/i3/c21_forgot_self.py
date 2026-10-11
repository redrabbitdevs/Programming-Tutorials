class Resource:
    def __enter__(self):
        print("opened")  # forgot: return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("closed")

    def read(self):
        return "data"


try:
    with Resource() as r:
        print(r.read())
except AttributeError as error:
    print("AttributeError:", error)
