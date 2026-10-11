def average(a, b):
    return a + b / 2   # bug: should be (a + b) / 2


print(average(10, 20), "but the average of 10 and 20 is 15")
