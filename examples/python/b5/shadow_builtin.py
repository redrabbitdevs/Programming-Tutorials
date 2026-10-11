numbers = [3, 1, 2]
print(sum(numbers))

sum = 100
try:
    print(sum(numbers))
except TypeError as error:
    print("TypeError:", error)

del sum
print(sum(numbers))
