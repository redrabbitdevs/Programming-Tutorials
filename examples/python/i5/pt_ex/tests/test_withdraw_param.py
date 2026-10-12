import pytest

from bank import Account, InsufficientFunds


@pytest.fixture
def account():
    """An account with 100 in it, rebuilt for every test."""
    return Account("Ana", 100)


@pytest.mark.parametrize(("amount", "expected_balance"), [(10, 90), (100, 0)])
def test_valid_withdrawals(account, amount, expected_balance):
    account.withdraw(amount)
    assert account.balance == expected_balance


@pytest.mark.parametrize(
    ("amount", "error"),
    [(150, InsufficientFunds), (0, ValueError), (-5, ValueError)],
)
def test_refused_withdrawals_leave_the_balance_alone(account, amount, error):
    with pytest.raises(error):
        account.withdraw(amount)
    assert account.balance == 100
