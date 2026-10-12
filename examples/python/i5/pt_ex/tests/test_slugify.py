import pytest

from textutil import average, slugify


def test_lowercases_and_joins_with_hyphens():
    assert slugify("Hello World") == "hello-world"


def test_drops_punctuation():
    assert slugify("Hello, World!") == "hello-world"


def test_empty_text_gives_empty_slug():
    assert slugify("") == ""


def test_average_of_integers():
    assert average([2, 4, 6]) == 4


def test_average_of_floats_needs_a_tolerance():
    assert average([0.1, 0.2]) == pytest.approx(0.15)


def test_average_of_nothing_is_an_error():
    with pytest.raises(ValueError, match="at least one"):
        average([])
