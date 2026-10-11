colours = ["red", "green", "blue"]

it = iter(colours)
print(type(it).__name__)
print(next(it))
print(next(it))
print(next(it))

try:
    next(it)
except StopIteration:
    print("stop")

# What a for loop does behind the scenes:
it = iter(colours)
while True:
    try:
        colour = next(it)
    except StopIteration:
        break
    print("got", colour)
