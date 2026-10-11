def make_counter(start=0, step=1):
    value = start - step

    def next_value():
        nonlocal value
        value += step
        return value

    def reset():
        nonlocal value
        value = start - step

    next_value.reset = reset
    return next_value


evens = make_counter(0, 2)
print(evens(), evens(), evens())
evens.reset()
print(evens())
tens = make_counter(10, 10)
print(tens(), tens())
