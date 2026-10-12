from typing import disjoint_base


@disjoint_base
class Vector:
    pass


@disjoint_base
class Matrix:
    pass


class Hybrid(Vector, Matrix):
    pass


print([cls.__name__ for cls in Hybrid.__mro__])
try:

    class Both(int, str):
        pass

except TypeError as error:
    print("TypeError:", error)
