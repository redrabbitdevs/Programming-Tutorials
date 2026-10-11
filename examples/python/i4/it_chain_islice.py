from itertools import chain, islice

weekdays = ["mon", "tue"]
weekend = ("sat", "sun")
print(list(chain(weekdays, weekend, "x")))

lists = [[1, 2], [3], [4, 5]]
print(list(chain.from_iterable(lists)))


def naturals():
    n = 1
    while True:
        yield n
        n += 1


print(list(islice(naturals(), 5)))
print(list(islice(naturals(), 3, 6)))
print(list(islice("abcdefgh", 0, None, 3)))
