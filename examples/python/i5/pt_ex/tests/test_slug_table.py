import pytest

from textutil import slugify


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ("Hello World", "hello-world"),
        ("  padded  ", "padded"),
        ("Rock & Roll", "rock-roll"),
        ("a.b.c", "a-b-c"),
        ("", ""),
    ],
)
def test_slugify_table(text, expected):
    assert slugify(text) == expected
