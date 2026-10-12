import pytest

from bank import Account, InsufficientFunds


def test_new_account_has_the_opening_balance():
    account = Account("Ana", 50)
    assert account.balance == 50


def test_deposit_adds_to_the_balance():
    account = Account("Ana", 50)
    account.deposit(25)
    assert account.balance == 75


def test_withdraw_subtracts_from_the_balance():
    account = Account("Ana", 50)
    account.withdraw(20)
    assert account.balance == 30


def test_withdraw_more_than_the_balance_is_refused():
    account = Account("Ana", 50)
    with pytest.raises(InsufficientFunds):
        account.withdraw(80)
    assert account.balance == 50


def test_error_message_names_the_numbers():
    account = Account("Ana", 50)
    with pytest.raises(InsufficientFunds, match=r"balance 50, asked for 80"):
        account.withdraw(80)


def test_negative_deposit_is_a_value_error():
    with pytest.raises(ValueError) as info:
        Account("Ana").deposit(-5)
    assert "positive" in str(info.value)
