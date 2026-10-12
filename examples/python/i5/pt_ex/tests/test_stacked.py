import pytest


@pytest.mark.parametrize("quantity", [1, 2, 3])
@pytest.mark.parametrize("price", [10, 20])
def test_order_total_is_positive(quantity, price):
    assert quantity * price > 0
