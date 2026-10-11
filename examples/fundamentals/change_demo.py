def show_change(amount, coins):
    print(f"{amount}:", end="")
    for coin in coins:
        while amount >= coin:
            print(f" {coin}", end="")
            amount -= coin
    print()


show_change(63, [25, 10, 5, 1])
show_change(6, [4, 3, 1])
show_change(0, [25, 10, 5, 1])
