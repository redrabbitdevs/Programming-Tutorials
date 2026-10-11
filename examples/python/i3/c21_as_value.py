class Greeter:
    def __enter__(self):
        return "hello from __enter__"

    def __exit__(self, exc_type, exc_value, traceback):
        pass


with Greeter() as message:
    print(message)
