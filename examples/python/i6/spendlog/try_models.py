from datetime import date
from decimal import Decimal

from spendlog.models import Category, Expense

coffee = Expense(date(2026, 3, 2), Category.FOOD, Decimal("3.50"), "Coffee")
print(coffee)
print(Category("transport"), coffee.category == "food")

try:
    coffee.amount = Decimal("4.00")
except AttributeError as error:
    print(type(error).__name__)

try:
    Category("travel")
except ValueError as error:
    print(error)
