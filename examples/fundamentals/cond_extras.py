# Short-circuiting guards a risky check.
items = []
if items and items[0] > 5:
    print("big first item")
else:
    print("no big first item")


# Guard clauses: reject the odd cases first, then write the main path flat.
# (Functions are the subject of lesson 9; read "def" as "name a reusable block".)
def describe_average(total, count):
    if count == 0:
        return "no data"
    return f"average {total / count}"


print(describe_average(10, 4))
print(describe_average(0, 0))

# A conditional expression picks one of two values.
n = 7
parity = "even" if n % 2 == 0 else "odd"
print(n, "is", parity)
