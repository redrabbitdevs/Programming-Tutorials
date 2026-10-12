import pytest

from bank import Account


def test_negative_opening_balance_is_refused():
    with pytest.raises(ValueError, match="cannot be negative"):
        Account("Ana", -1)


def test_deposit_of_zero_is_refused():
    with pytest.raises(ValueError, match="must be positive"):
        Account("Ana").deposit(0)


def test_withdrawal_of_zero_is_refused():
    with pytest.raises(ValueError, match="must be positive"):
        Account("Ana", 10).withdraw(0)


def test_balance_is_unchanged_after_a_refused_withdrawal():
    account = Account("Ana", 10)
    with pytest.raises(ValueError):
        account.withdraw(-5)
    assert account.balance == 10
