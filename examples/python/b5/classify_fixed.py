def sign(n):
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"


def classify(n):
    return sign(n)


print(classify(5), classify(0), classify(-5))
