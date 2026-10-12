import pytest

from numparse import parse_number


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ("42", 42),
        ("  42  ", 42),
        ("1,234", 1234),
        ("1_000_000", 1_000_000),
        ("3.5", 3.5),
        ("-7", -7),
        ("1e3", 1000.0),
    ],
)
def test_parses_valid_text(text, expected):
    result = parse_number(text)
    assert result == expected
    assert type(result) is type(expected)


@pytest.mark.parametrize("text", ["", "   ", "abc", "1.2.3", "12 34"])
def test_rejects_invalid_text(text):
    with pytest.raises(ValueError):
        parse_number(text)


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        pytest.param("0.1", 0.1, id="simple-float"),
        pytest.param("1,000.5", 1000.5, id="thousands-and-decimal"),
    ],
)
def test_named_cases(text, expected):
    assert parse_number(text) == expected
