import pytest

from bank import Account


def test_negative_opening_balance_is_refused():
    with pytest.raises(ValueError, match="cannot be negative"):
        Account("Ana", -1)


def test_negative_withdrawal_is_refused():
    with pytest.raises(ValueError, match="must be positive"):
        Account("Ana", 10).withdraw(-5)
