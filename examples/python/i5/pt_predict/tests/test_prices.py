def total(prices):
    return sum(prices)


def test_two_prices():
    assert total([1.5, 2.5]) == 4.0


def test_empty_list():
    total([])


def test_rounded_sum():
    assert round(total([0.1, 0.2]), 1) == 0.4
