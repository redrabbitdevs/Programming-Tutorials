from annotationlib import Format, get_annotations


class Order:
    id: int
    customer: Customer
    lines: list[Line]


for fmt in (Format.STRING, Format.FORWARDREF):
    print(fmt.name, get_annotations(Order, format=fmt))


class Customer:
    pass


class Line:
    pass


print("VALUE", get_annotations(Order, format=Format.VALUE))
