import inspect

print("sorted", inspect.signature(sorted))
print("str.split", inspect.signature(str.split))
print("round", inspect.signature(round))

words = ["pear", "fig", "banana"]
print(sorted(words, key=len, reverse=True))
print("a,b,c,d".split(",", 2))
print(round(3.14159, 2))
