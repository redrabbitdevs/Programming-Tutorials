from functools import reduce
import operator

numbers = [1, 2, 3, 4]
print(reduce(operator.add, numbers))
print(reduce(operator.mul, numbers))
print(reduce(lambda total, n: total * 10 + n, numbers))
print(reduce(operator.add, [], 0))
print(sum(numbers), max(numbers))
