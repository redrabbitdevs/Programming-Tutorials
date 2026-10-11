class Quiet:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return True  # swallows every error, including bugs


with Quiet():
    print(undefined_name)
print("the NameError vanished")
