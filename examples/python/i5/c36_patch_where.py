from unittest.mock import patch

import c36_shop

# c36_shop did `from c36_clock import current_hour`, so the shop module holds its
# own name for the function. Patching the clock module replaces a different name.
with patch("c36_clock.current_hour", return_value=9):
    print("shop sees:", type(c36_shop.current_hour).__name__)

# Patch the name where it is looked up: in the shop module.
with patch("c36_shop.current_hour", return_value=9):
    print("shop sees:", type(c36_shop.current_hour).__name__)
    print(c36_shop.banner())

with patch("c36_shop.current_hour", return_value=15):
    print(c36_shop.banner())
