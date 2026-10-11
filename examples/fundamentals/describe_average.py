def describe_average(total, count):
    if count == 0:
        return "no data"
    return f"average {total / count}"


print(describe_average(10, 4))
print(describe_average(0, 0))
