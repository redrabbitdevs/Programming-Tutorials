def count_down(n):
    if n == 0:
        print("liftoff")
        return
    print(n)
    count_down(n - 1)


count_down(3)
