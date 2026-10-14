import time


def fetch():
    time.sleep(1)                         # stands in for a network call


def crunch():
    return sum(i * i for i in range(3_000_000))


fetch()
crunch()
