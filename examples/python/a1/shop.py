from annotationlib import Format, get_annotations
from typing import TYPE_CHECKING

from customers import Customer
from orders import Order

ada = Customer("ada")
Order(ada, 9.5)
print(TYPE_CHECKING, [order.total for order in ada.orders])
print(get_annotations(Customer.add, format=Format.STRING))
try:
    get_annotations(Customer.add)
except NameError as error:
    print("NameError:", error)
