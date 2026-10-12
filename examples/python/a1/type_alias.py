type Pair[T] = tuple[T, T]
type Json = dict[str, Json] | list[Json] | str | int | float | bool | None


def swap[T](pair: Pair[T]) -> Pair[T]:
    return (pair[1], pair[0])


print(swap((1, 2)))
print(type(Pair).__name__, Pair.__type_params__)
print(Pair.__value__)
print(Json.__value__)
try:
    isinstance((1, 2), Pair)
except TypeError as error:
    print("TypeError:", error)
