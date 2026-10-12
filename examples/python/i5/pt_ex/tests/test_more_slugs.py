import pytest

from textutil import average, slugify


def test_ampersand_becomes_a_separator():
    assert slugify("Rock & Roll") == "rock-roll"


def test_outer_spaces_are_dropped():
    assert slugify("  padded  ") == "padded"


def test_dots_become_hyphens():
    assert slugify("a.b.c") == "a-b-c"


def test_average_with_a_fraction():
    assert average([1, 2]) == pytest.approx(1.5)
