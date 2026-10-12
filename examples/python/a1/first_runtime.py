def first[T](items: list[T]) -> T:
    return items[0]


print(first.__type_params__)
(T,) = first.__type_params__
print(type(T).__name__, T.__name__)
print("T" in globals())
