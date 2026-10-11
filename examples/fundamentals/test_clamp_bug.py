def clamp(x, low, high):
    if x < low:
        return low
    if x > high:
        return low  # copy-and-paste slip: should return high
    return x


failures = 0


def check(name, actual, expected):
    global failures
    if actual == expected:
        print("PASS", name)
    else:
        failures += 1
        print("FAIL", name, "- expected", expected, "but got", actual)


check("below the range", clamp(-5, 0, 10), 0)
check("inside the range", clamp(7, 0, 10), 7)
check("above the range", clamp(15, 0, 10), 10)
print(failures, "failed")
