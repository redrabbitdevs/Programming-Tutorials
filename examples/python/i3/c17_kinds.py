class Demo:
    count = 0

    def instance_method(self):
        return f"instance method on {self!r}"

    @classmethod
    def class_method(cls):
        return f"class method on {cls.__name__}"

    @staticmethod
    def static_method():
        return "static method, no self or cls"


d = Demo()
print(d.class_method())
print(Demo.class_method())
print(Demo.static_method())
print(d.instance_method().startswith("instance method on <"))
