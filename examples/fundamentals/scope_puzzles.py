# Puzzle 1
x = 1


def f1():
    x = 2


f1()
print(x)

# Puzzle 2
y = 1


def f2():
    print(y)


f2()

# Puzzle 3
z = 1


def f3():
    global z
    z = 2


f3()
print(z)


# Puzzle 4
def f4():
    secret = 5


f4()
try:
    print(secret)
except NameError:
    print("NameError")

# Puzzle 5
for i in range(3):
    pass
print(i)

# Puzzle 6
name = "a"


def outer():
    name = "b"

    def inner():
        print(name)

    inner()


outer()
