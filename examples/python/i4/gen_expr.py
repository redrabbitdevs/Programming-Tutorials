def noisy(n):
    for i in range(n):
        print("making", i)
        yield i


squares_list = [x * x for x in noisy(3)]
print("list built")

squares_gen = (x * x for x in noisy(3))
print("generator built")
print(next(squares_gen))
print("sum:", sum(x * x for x in range(1, 4)))
print(any(x > 2 for x in noisy(10)))
