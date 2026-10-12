import annotationlib
from annotationlib import Format


class Fields(type):
    def __new__(mcls, name, bases, ns):
        print("__annotations__" in ns)
        annotate = annotationlib.get_annotate_from_class_namespace(ns)
        hints = {}
        if annotate is not None:
            hints = annotationlib.call_annotate_function(
                annotate, Format.FORWARDREF)
        ns["_fields"] = tuple(hints)
        return super().__new__(mcls, name, bases, ns)


class Order(metaclass=Fields):
    id: int
    customer: Customer
    total: float


print(Order._fields)
