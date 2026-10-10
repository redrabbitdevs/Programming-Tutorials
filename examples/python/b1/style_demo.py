# Check whether the guests fit around the table.
MAX_SEATS = 4

guests = 3  # people who said yes

if guests <= MAX_SEATS:
    print("Everyone fits.")
    print(f"Spare seats: {MAX_SEATS - guests}")
else:
    print("Too many guests.")
