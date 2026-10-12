def add_tax(price, rate):
    return round(price * (1 + rate), 2)


def test_plain_comparison():
    result = add_tax(10, 0.2)
    assert result == 12.5


def test_dictionaries():
    expected = {"name": "Ana", "age": 31, "city": "Lima"}
    actual = {"name": "Ana", "age": 13, "city": "Lima"}
    assert actual == expected


def test_lists():
    assert [1, 2, 3, 4] == [1, 2, 4, 4]
