import math
from decimal import Decimal
from fractions import Fraction

print(math.isclose(0.1 + 0.2, 0.3))
print(math.sqrt(16), math.floor(-2.5), math.ceil(-2.5))
print(Decimal("0.1") + Decimal("0.2"))
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))
print(Fraction(1, 3) + Fraction(1, 6))
print(Decimal(0.1))
