class Greeter:
    def hello(self):
        return f"hello from {type(self).__name__}"


func = Greeter.__dict__["hello"]
print(type(func).__name__, hasattr(func, "__get__"))
bound = func.__get__(Greeter(), Greeter)
print(type(bound).__name__, bound())
print(Greeter.hello is func)
